from fastapi import APIRouter, HTTPException
from .controller import get_core

core_instance = get_core()

router = APIRouter(
    prefix="/dashboard",
    tags=['dashboard'],
    responses={404: {"dashboard": "Not found"}}
)

@router.get("/stats/", status_code=200)
async def get_log_stats():
    """
    Returns statistics about the log:
    {
        "casesCount": Total de casos no log,
        "activitiesCount": Total de atividades no log,
        "avgActivitiesPerCase": Média de atividades por caso,
        "avgCaseDuration": Duração média, em segundos, de cada caso,
        "avgActivityDuration: Duração média, em segundos, de cada atividade
    }
    """
    event_log = core_instance.log

    activity_count = []
    case_durations = []
    activity_durations = []

    for trace in event_log:
        trace_duration = 0
        activity_count.append(len(trace))

        for activity in trace:
            activity_duration = (activity['End'] - activity['Start']).total_seconds()
            activity_durations.append(activity_duration)
            trace_duration += activity_duration

        case_durations.append(trace_duration)

    avg_case_duration = 0
    if len(case_durations) > 0:
        avg_case_duration = round(sum(case_durations) / len(case_durations), 2)
    
    avg_atividades_duration = 0
    if len(activity_durations) > 0:
        avg_atividades_duration = round(sum(activity_durations) / len(activity_durations), 2)
    
    avg_atividades_count_per_case = 0
    if len(activity_count) > 0:
        avg_atividades_count_per_case = round(sum(activity_count) / len(activity_count), 2)

    return {
        "casesCount": len(event_log),
        "activitiesCount": sum(activity_count),
        "avgActivitiesPerCase": avg_atividades_count_per_case,
        "avgCaseDuration": avg_case_duration,
        "avgActivityDuration": avg_atividades_duration
    }