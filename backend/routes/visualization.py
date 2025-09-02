from fastapi.responses import FileResponse
from modules.core import core_instance
from modules import generate_svg
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/visualization",
    tags=['visualization'],
    responses={404: {"visualization": "Not found"}}
)

@router.get("/image/", status_code=200)
async def get_eventlog_image():
    """ Returns the svg image string of the log. """
    event_log = core_instance.log.copy()
    svg_file_path = generate_svg(event_log)
    return FileResponse(svg_file_path)
