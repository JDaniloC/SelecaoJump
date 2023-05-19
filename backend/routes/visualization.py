from fastapi import APIRouter, HTTPException
from .controller import get_core
import pm4py

core_instance = get_core()

router = APIRouter(
    prefix="/visualization",
    tags=['visualization'],
    responses={404: {"visualization": "Not found"}}
)

def generate_svg(eventlog, freq_dfg_file_path: str = './data/freq_dfg.svg'):
    frequency_dfg, frequency_start_activities, frequency_end_activities = pm4py.discover_dfg(eventlog)
    pm4py.save_vis_dfg(frequency_dfg, frequency_start_activities, frequency_end_activities, freq_dfg_file_path)
    return freq_dfg_file_path

@router.get("/image/", status_code=200)
async def get_eventlog_image():
    """ Returns the svg image string of the log. """
    event_log = core_instance.log

    svg_file_path = generate_svg(event_log)

    with open(svg_file_path, encoding='utf-8') as file:
        svg_str = "".join(file.read().splitlines())

    return {"image": svg_str}

