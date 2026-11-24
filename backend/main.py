from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from database import get_db
from models import UserBase
from schemas import SingInSchema, SingUpSchema
from pwdlib import PasswordHash

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

hasher = PasswordHash.recommended()
def get_password_hash(password:str) -> str:
    return hasher.hash(password)

def verify_password(password:str, hashed_password:str) -> bool:
    return hasher.verify(password, hashed_password)

# Endpoint for create a user
@app.post("/singup-submit") # Need add password hasher func
async def singup(user_data: SingUpSchema, db: Session = Depends(get_db)): # db это сессия типа данных сессия которая равна ответу зависимоти, то есть тому, что возвращается функция в Depends
    existing_user = db.query(UserBase).filter(UserBase.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email is exists yet"
        )
    hashed_password = get_password_hash(user_data.password)
    new_user = UserBase(email=user_data.email, hashed_password=hashed_password) # Need add a hashed password
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"success": True, "message": "User has been created successfully", "user_id": new_user.id}

# Endpoint for login a user
@app.post("/singin-submit")
async def singin(user_data: SingInSchema, db: Session = Depends(get_db)):
    user = db.query(UserBase).filter(UserBase.email == user_data.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Wrong email or password"
        )
    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED
        )
    return{"success": True, "message": "Sing In Successfully", "user_id": user.id}