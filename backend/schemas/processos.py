from pydantic import BaseModel

class Processo(BaseModel):
    NPU: str
    movimentosCount: int
    duration: float
    pinnedMovimentoCount: int