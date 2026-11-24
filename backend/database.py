from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import UserBase

DATABASE_URL = "postgresql://postgres:postgresqlpass@localhost:5432/square_analytics_db"
engine = create_engine(DATABASE_URL, echo=True) # движок, который знает как работать с разными бд и может делать sql запросы

session_generator = sessionmaker(autoflush=False, bind=engine) # объект класса sessionmaker являтся генератором сессий

def get_db(): # функция создания сессии. Сессия сохраняет измненения базы и принимает их через commnit() или отменяет через rollback()
    with session_generator() as db:
        yield db # yield потому что внутри эндпоинта сессия должна остоваться закрытой. return сразу закрыл бы сессию