from fastapi import APIRouter, HTTPException
from .controller import get_core

core_instance = get_core()

router = APIRouter(
    prefix="/dashboard",
    tags=['dashboard'],
    responses={404: {"dashboard": "Not found"}}
)

@router.get("/test/", status_code=200)
async def get_dashboard_infos():
    """ Test route. """

    return {
        "test": len(core_instance.log)
    }