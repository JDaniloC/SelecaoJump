import { APP_INITIALIZER } from '@angular/core';
import { AnalysisFacade } from './analysis.facade';
import { AnalysisApi } from './api/analysis.api';
import { Processo } from './types/Processo';
import { FlowchartFacade } from '../flowchart/flowchart.facade';

export const analysisInitializer = (
    facade: AnalysisFacade,
    api: AnalysisApi,
    flowchartFacade: FlowchartFacade
  ) => () => {

  flowchartFacade.getQueryParams().subscribe(
    async (movimento) => {
      facade.setMovimentoSelected(movimento);
      try {
        const response: Processo[] = await
          api.fetchProcessosData({ movimento: movimento })
        facade.setProcessoData(response);
      } catch (error) {
        console.error(error);
      }
    }
  );
};

export const analysisInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: analysisInitializer,
  multi: true,
  deps: [AnalysisFacade, AnalysisApi, FlowchartFacade],
};
