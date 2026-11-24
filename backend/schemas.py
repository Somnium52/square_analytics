from pydantic import BaseModel, EmailStr 

# Схемы описывают как должны выглядеть данные получаемые от пользователя

class SingUpSchema(BaseModel): 
    email: EmailStr
    password: str

class SingInSchema(BaseModel):
    email: EmailStr
    password: str