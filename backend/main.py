from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

# Load .env config
load_dotenv()

# FastAPI app setup
app = FastAPI()

# CORS middleware (adjust origin for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client["clinic"]

# === User Auth ===

class User(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    location: str

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

# === Appointment Booking ===

class AppointmentModel(BaseModel):
    doctorId: int
    doctorName: str
    specialization: str
    appointmentType: str
    date: str
    timeSlot: str
    name: str
    email: EmailStr
    phone: str
    age: str
    gender: str
    symptoms: str
    price: int

@app.post("/appointments")
async def create_appointment(request: Request):
    try:
        data = await request.json()
        appointment = AppointmentModel(**data)
        db.appointments.insert_one(appointment.dict())
        return {"message": "Appointment created successfully."}
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Invalid appointment data: {str(e)}")

# === Contact Form ===

class Contact(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    category: str
    message: str

@app.post("/contact")
def submit_contact(contact: Contact):
    try:
        db.contacts.insert_one(contact.dict())
        return {"message": "Contact form submitted successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
