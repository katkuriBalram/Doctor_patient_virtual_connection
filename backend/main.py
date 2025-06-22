from fastapi import FastAPI, HTTPException, Body, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Setup
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["clinic"]

# === Pydantic Models ===

class User(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    location: str

class AppointmentModel(BaseModel):
    doctorId: int
    doctorName: str
    specialization: str
    appointmentType: str
    date: str  # Store ISO string
    timeSlot: str
    name: str
    email: EmailStr
    phone: str
    age: str
    gender: str
    symptoms: str
    price: int

class Contact(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    category: str
    message: str

# === Auth Routes ===

@app.post("/signup")
def signup(user: User):
    if db.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered.")
    db.users.insert_one(user.dict())
    return {"message": "Account created successfully."}

@app.post("/login")
def login(data: dict = Body(...)):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required.")

    user = db.users.find_one({"email": email, "password": password})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    return {
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "location": user["location"]
    }

# === Appointment Routes ===

@app.post("/appointments")
async def create_appointment(request: Request):
    try:
        data = await request.json()
        appointment = AppointmentModel(**data)
        db.appointments.insert_one(appointment.dict())
        return {"message": "Appointment created successfully."}
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Invalid appointment data: {str(e)}")

# ✅ NEW ROUTE: Fetch appointments by email from path
@app.get("/appointments/user/{email}")
def get_user_appointments(email: str):
    try:
        appointments = list(db.appointments.find({"email": email}))
        for appt in appointments:
            appt["_id"] = str(appt["_id"])
        return appointments
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch appointments: {str(e)}")

# (Optional) Keep query-based version too
@app.get("/appointments")
def get_appointments_by_email(email: EmailStr = Query(...)):
    try:
        appointments = list(db.appointments.find({"email": email}))
        for appt in appointments:
            appt["_id"] = str(appt["_id"])
        return appointments
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch appointments: {str(e)}")

# === Contact Route ===

@app.post("/contact")
def submit_contact(contact: Contact):
    try:
        db.contacts.insert_one(contact.dict())
        return {"message": "Contact form submitted successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
