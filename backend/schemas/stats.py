from pydantic import BaseModel
from datetime import timedelta

class LogStats(BaseModel):
    casesCount: int
    movimentosCount: int
    avgCaseDuration: timedelta
    avgMovimentosPerCase: float
    avgMovimentoDuration: timedelta
