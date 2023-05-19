from fastapi import APIRouter

from routes import dashboard
from routes import visualization

routes = APIRouter()

routes.include_router(dashboard.router)
routes.include_router(visualization.router)