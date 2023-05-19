from routes.api import routes
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import get_core

app = FastAPI()

file_path = "./data/grande.csv"

core_instance = get_core()
print("Loading data into EventLog...")
core_instance.load_log_data(file_path)
print("EventLog done.")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes)