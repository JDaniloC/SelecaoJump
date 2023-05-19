from fastapi import APIRouter

from routes import dashboard

routes = APIRouter()

routes.include_router(dashboard.router)