import { Injectable } from "@angular/core";
import { AnalysisState } from "./state/analysis-state/analysis.state";
import { Processo } from "./types/Processo";

@Injectable()
export class AnalysisFacade {
    public constructor(
        private readonly state: AnalysisState,
    ) {}

    public getProcessoData() {
        return this.state.getProcessoData();
    }

    public setProcessoData(processoData: Processo[]) {
        this.state.setProcessoData(processoData);
    }

    public getMovimentoSelected() {
        return this.state.getMovimentoSelected();
    }

    public setMovimentoSelected(movimento: string) {
        this.state.setMovimentoSelected(movimento);
    }
}
