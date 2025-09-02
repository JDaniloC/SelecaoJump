import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FlowchartFacade } from './flowchart.facade';
import { FlowchartApi } from './api/flowchart/flowchart.api';
import { FlowchartState } from './state/flowchart-state/flowchart.state';
import { ProcessoStatistics } from './types/ProcessoStatistics';

describe('FlowchartFacade', () => {
  let facade: FlowchartFacade;
  let stateMock: Partial<FlowchartState>;
  let apiMock: Partial<FlowchartApi>;

  beforeEach(() => {
    stateMock = {
      getFlowgraph: () => of(''),
      getProcessoStatistics: () => of({} as ProcessoStatistics),
      getQueryParams: () => of(''),
      setFlowgraph: () => {},
      setProcessoStatistics: () => {},
      setQueryParams: () => {},
    };

    apiMock = {
      fetchProcessoStatistics: () => of({} as ProcessoStatistics),
    };

    TestBed.configureTestingModule({
      providers: [
        FlowchartFacade,
        { provide: FlowchartState, useValue: stateMock },
        { provide: FlowchartApi, useValue: apiMock },
      ],
    });

    facade = TestBed.inject(FlowchartFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });
});
