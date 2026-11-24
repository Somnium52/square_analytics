from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String, TIMESTAMP
from sqlalchemy.orm import Session, DeclarativeBase


class Base(DeclarativeBase): # Базовый класс таблицы в базе данных для валидации типов данных
    pass

class UserBase(Base): # Класс таблицы в базе данных. Имеет конвертацию данных пайтон в данные бд. Параметры в mapped_column имеют наивысший приоритет
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255))
    hashed_password: Mapped[str] = mapped_column(String(255))
    is_verified: Mapped[bool] = mapped_column()
    created_at: Mapped[str] = mapped_column(TIMESTAMP)