from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from threading import Lock
from typing import Literal, Optional
import json
import os
import smtplib
import ssl
import urllib.parse

from dotenv import load_dotenv
from fastapi import FastAPI, Form, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, ValidationError, field_validator

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
LEADS_FILE = DATA_DIR / "leads.json"

app = FastAPI(
    title="TZENIX Contact Backend",
    version="2.0.0",
    description="Production-ready contact backend for TZENIX website lead capture.",
)

# Restrict this in production to the real domain(s)
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS",
        "http://127.0.0.1:5500,http://localhost:5500,http://127.0.0.1:3000,http://localhost:3000",
    ).split(",")
    if origin.strip()
]
TRUSTED_HOSTS = [
    host.strip()
    for host in os.getenv("TRUSTED_HOSTS", "localhost,127.0.0.1").split(",")
    if host.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if ALLOWED_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Accept", "Content-Type", "Origin", "User-Agent"],
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=TRUSTED_HOSTS or ["localhost", "127.0.0.1"])

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_USE_TLS = os.getenv("SMTP_USE_TLS", "true").strip().lower() == "true"
TZENIX_EMAIL = os.getenv("TZENIX_EMAIL", "tzenix86@gmail.com")
TZENIX_PHONE = os.getenv("TZENIX_PHONE", "+923232186947")
TZENIX_COMPANY = os.getenv("TZENIX_COMPANY", "TZENIX")
MAX_MESSAGE_LENGTH = int(os.getenv("MAX_MESSAGE_LENGTH", 3000))
MAX_NAME_LENGTH = int(os.getenv("MAX_NAME_LENGTH", 80))
MAX_COMPANY_LENGTH = int(os.getenv("MAX_COMPANY_LENGTH", 120))
RATE_LIMIT_MAX_REQUESTS = int(os.getenv("RATE_LIMIT_MAX_REQUESTS", 5))
RATE_LIMIT_WINDOW_SECONDS = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", 300))
lead_file_lock = Lock()
rate_limit_lock = Lock()
request_log: dict[str, deque] = defaultdict(deque)


class LeadSubmission(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    company: Optional[str] = ""
    project_type: Literal["ecommerce", "mobile", "wordpress", "uiux", "ai", "modification", "other"]
    budget: str
    message: str
    newsletter: bool = False

    @field_validator("first_name", "last_name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Name is required")
        if len(value) > MAX_NAME_LENGTH:
            raise ValueError(f"Name must be at most {MAX_NAME_LENGTH} characters")
        return value

    @field_validator("company")
    @classmethod
    def validate_company(cls, value: Optional[str]) -> str:
        value = (value or "").strip()
        if len(value) > MAX_COMPANY_LENGTH:
            raise ValueError(f"Company must be at most {MAX_COMPANY_LENGTH} characters")
        return value

    @field_validator("message")
    @classmethod
    def validate_message(cls, value: str) -> str:
        value = value.strip()
        if len(value) < 10:
            raise ValueError("Message must be at least 10 characters")
        if len(value) > MAX_MESSAGE_LENGTH:
            raise ValueError(f"Message must be at most {MAX_MESSAGE_LENGTH} characters")
        return value

    @field_validator("budget")
    @classmethod
    def validate_budget(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Budget is required")
        return value


class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    smtp_configured: bool
    storage_ready: bool
    allowed_origins_configured: bool
    trusted_hosts_configured: bool
    timestamp: str


def ensure_storage() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not LEADS_FILE.exists():
        LEADS_FILE.write_text("[]", encoding="utf-8")


def get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def add_security_headers(response: JSONResponse) -> JSONResponse:
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Cache-Control"] = "no-store"
    return response


def check_rate_limit(request: Request) -> None:
    client_ip = get_client_ip(request)
    now = datetime.now(timezone.utc)
    window_start = now - timedelta(seconds=RATE_LIMIT_WINDOW_SECONDS)

    with rate_limit_lock:
        attempts = request_log[client_ip]
        while attempts and attempts[0] < window_start:
            attempts.popleft()

        if len(attempts) >= RATE_LIMIT_MAX_REQUESTS:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests. Please try again later.",
            )

        attempts.append(now)


def normalize_phone(phone: str) -> str:
    return "".join(char for char in phone if char.isdigit())


def generate_whatsapp_link(payload: LeadSubmission) -> str:
    phone = normalize_phone(TZENIX_PHONE)

    wa_message = (
        f"🔔 *New {TZENIX_COMPANY} Website Lead*\n\n"
        f"👤 *Name:* {payload.first_name} {payload.last_name}\n"
        f"📧 *Email:* {payload.email}\n"
        f"🏢 *Company:* {payload.company or 'Not specified'}\n"
        f"📋 *Project:* {payload.project_type}\n"
        f"💰 *Budget:* {payload.budget}\n"
        f"📰 *Newsletter:* {'Yes' if payload.newsletter else 'No'}\n\n"
        f"📝 *Message:*\n{payload.message}"
    )

    return f"https://wa.me/{phone}?text={urllib.parse.quote(wa_message)}"


def save_lead(payload: LeadSubmission, request: Request) -> dict:
    ensure_storage()

    lead = {
        "id": f"lead-{int(datetime.now(timezone.utc).timestamp() * 1000)}",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "full_name": f"{payload.first_name} {payload.last_name}".strip(),
        "email": str(payload.email),
        "company": payload.company,
        "project_type": payload.project_type,
        "budget": payload.budget,
        "message": payload.message,
        "newsletter": payload.newsletter,
        "ip_address": get_client_ip(request),
        "user_agent": request.headers.get("user-agent", "unknown"),
        "referer": request.headers.get("referer", ""),
    }

    with lead_file_lock:
        try:
            existing = json.loads(LEADS_FILE.read_text(encoding="utf-8"))
            if not isinstance(existing, list):
                existing = []
        except (json.JSONDecodeError, FileNotFoundError):
            existing = []

        existing.append(lead)
        LEADS_FILE.write_text(json.dumps(existing, indent=2), encoding="utf-8")

    return lead


def send_email_notification(lead: dict) -> bool:
    if not SMTP_USER or not SMTP_PASSWORD:
        print("WARNING: SMTP credentials not configured. Skipping email notification.")
        return False

    subject = f"New Lead from {TZENIX_COMPANY}: {lead['full_name']}"
    body = f"""New website lead received

Lead ID: {lead['id']}
Submitted At: {lead['created_at']}

Name: {lead['full_name']}
Email: {lead['email']}
Company: {lead['company'] or 'Not specified'}
Project Type: {lead['project_type']}
Budget: {lead['budget']}
Newsletter: {'Yes' if lead['newsletter'] else 'No'}

Message:
{lead['message']}

Technical Metadata
IP Address: {lead['ip_address']}
User Agent: {lead['user_agent']}
Referer: {lead['referer'] or 'N/A'}
"""

    msg = MIMEMultipart()
    msg["From"] = SMTP_USER
    msg["To"] = TZENIX_EMAIL
    msg["Reply-To"] = lead["email"]
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain", "utf-8"))

    try:
        if SMTP_USE_TLS:
            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20)
            server.starttls(context=ssl.create_default_context())
        else:
            server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20, context=ssl.create_default_context())

        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, TZENIX_EMAIL, msg.as_string())
        server.quit()
        return True
    except Exception as exc:
        print(f"Email send error: {exc}")
        return False


@app.exception_handler(HTTPException)
async def http_exception_handler(_: Request, exc: HTTPException):
    return add_security_headers(
        JSONResponse(
            status_code=exc.status_code,
            content={"success": False, "message": exc.detail},
        )
    )


@app.exception_handler(ValidationError)
async def validation_exception_handler(_: Request, exc: ValidationError):
    first_error = exc.errors()[0]
    return add_security_headers(
        JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "success": False,
                "message": first_error.get("msg", "Validation error"),
                "errors": exc.errors(),
            },
        )
    )


@app.get("/")
def root():
    return add_security_headers(
        JSONResponse(
            {
                "message": "TZENIX backend is running.",
                "version": app.version,
                "endpoints": [
                    "/health (GET)",
                    "/send-message (POST)",
                    "/whatsapp (GET)",
                ],
            }
        )
    )


@app.get("/health")
def health_check():
    ensure_storage()
    return add_security_headers(
        JSONResponse(
            {
                "status": "ok",
                "app": "TZENIX Contact Backend",
                "version": app.version,
                "smtp_configured": bool(SMTP_USER and SMTP_PASSWORD),
                "storage_ready": LEADS_FILE.exists(),
                "allowed_origins_configured": bool(ALLOWED_ORIGINS),
                "trusted_hosts_configured": bool(TRUSTED_HOSTS),
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        )
    )


@app.get("/whatsapp")
async def get_whatsapp_link():
    phone = normalize_phone(TZENIX_PHONE)
    return add_security_headers(
        JSONResponse(
            {
                "success": True,
                "whatsapp_link": f"https://wa.me/{phone}",
                "phone": TZENIX_PHONE,
            }
        )
    )


@app.post("/send-message")
async def send_message(
    request: Request,
    firstName: str = Form(...),
    lastName: str = Form(...),
    email: str = Form(...),
    company: Optional[str] = Form(""),
    projectType: str = Form(...),
    budget: str = Form(...),
    message: str = Form(...),
    newsletter: Optional[str] = Form(None),
):
    check_rate_limit(request)

    try:
        payload = LeadSubmission(
            first_name=firstName,
            last_name=lastName,
            email=email,
            company=company,
            project_type=projectType,
            budget=budget,
            message=message,
            newsletter=str(newsletter).lower() in {"true", "1", "on", "yes"},
        )
    except ValidationError as exc:
        raise exc

    lead = save_lead(payload, request)
    whatsapp_link = generate_whatsapp_link(payload)
    email_sent = send_email_notification(lead)

    response_message = (
        "Message received successfully. Our team will contact you soon."
        if email_sent
        else "Lead saved successfully. Email notification is unavailable, but your message was recorded."
    )

    return add_security_headers(
        JSONResponse(
            {
                "success": True,
                "message": response_message,
                "lead_id": lead["id"],
                "email_sent": email_sent,
                "whatsapp_link": whatsapp_link,
            }
        )
    )


if __name__ == "__main__":
    import uvicorn

    ensure_storage()
    uvicorn.run(app, host="0.0.0.0", port=8000)
