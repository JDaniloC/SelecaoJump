import { AnalysisFacade } from './analysis.facade';
import { TestBed } from '@angular/core/testing';
import { AnalysisState } from './state/analysis-state/analysis.state';
import { Processo } from './types/Processo';
import { of } from 'rxjs';

describe('AnalysisFacade', () => {
  let facade: AnalysisFacade;
  let mockState: jasmine.SpyObj<AnalysisState>;

  beforeEach(() => {
    mockState = jasmine.createSpyObj('AnalysisState', [
      'getProcessoData',
      'setProcessoData',
      'getMovimentoSelected',
      'setMovimentoSelected'
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: AnalysisState, useValue: mockState },
        AnalysisFacade,
      ],
    })

    facade = TestBed.inject(AnalysisFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });


  it('should call getProcessoData method on state', () => {
    const mockProcessoData: Processo[] = [
      { NPU: '123', pinnedMovimentoCount: 1, movimentosCount: 10, duration: 100 },
      { NPU: '456', pinnedMovimentoCount: 0, movimentosCount: 20, duration: 200 },
    ];

    mockState.getProcessoData.and.returnValue(of(mockProcessoData));

    facade.getProcessoData().subscribe(
      (processoData) => {
        expect(processoData).toEqual(mockProcessoData);
      }
    );

    expect(mockState.getProcessoData).toHaveBeenCalled();
  })

  it('should call setProcessoData method on state', () => {
    const mockProcessoData: Processo[] = [
      { NPU: '123', pinnedMovimentoCount: 1, movimentosCount: 10, duration: 100 },
      { NPU: '456', pinnedMovimentoCount: 0, movimentosCount: 20, duration: 200 },
    ];

    facade.setProcessoData(mockProcessoData);

    expect(mockState.setProcessoData).toHaveBeenCalledWith(mockProcessoData);
  });


  it('should call getMovimentoSelected method on state', () => {
    const mockMovimentoSelected = 'A2';

    mockState.getMovimentoSelected.and.returnValue(of(mockMovimentoSelected));

    facade.getMovimentoSelected().subscribe(
      (movimentoSelected) => {
        expect(movimentoSelected).toEqual(mockMovimentoSelected);
      }
    );

    expect(mockState.getMovimentoSelected).toHaveBeenCalled();
  });

  it('should call setMovimentoSelected method on state', () => {
    const mockMovimentoSelected = 'A2';

    facade.setMovimentoSelected(mockMovimentoSelected);

    expect(mockState.setMovimentoSelected).toHaveBeenCalledWith(mockMovimentoSelected);
  });

});
