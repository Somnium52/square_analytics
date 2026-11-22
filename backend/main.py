from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SingupSchema(BaseModel):
    email: EmailStr
    password: str


@app.post("/singup-submit")
async def singup(data: SingupSchema):
    if data.email != "" and data.password != "":
        if len(data.password) >= 8:
            return {"success": True, "message": "Sing Up is successful"}
        else:
            return {"success": False, "message": "Password must be at least 8 characters"}
    else:
        return {"success": False, "message": "Empty user data"}