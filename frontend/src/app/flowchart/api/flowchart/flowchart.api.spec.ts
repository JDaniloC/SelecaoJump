import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';
import { FlowchartApi } from './flowchart.api';
import { DomSanitizer } from '@angular/platform-browser';

describe('FlowchartApi', () => {
  let service: FlowchartApi;
  let httpTestingController: HttpTestingController
  let sanitizerMock: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    sanitizerMock = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', ['bypassSecurityTrustHtml']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FlowchartApi, { provide: DomSanitizer, useValue: sanitizerMock } ],
    });
    service = TestBed.inject(FlowchartApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch processo statistics', () => {
    const mockProcessoStatistics: ProcessoStatistics = {
      movimentosCount: 10,
      casesCount: 5,
      avgCaseDuration: 10,
      avgMovimentoDuration: 5,
      avgMovimentosPerCase: 30
    };

    service.fetchProcessoStatistics().subscribe((processoStatistics: ProcessoStatistics) => {
      expect(processoStatistics).toEqual(mockProcessoStatistics);
    });

    const req = httpTestingController.expectOne('/api/processos/stats/');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProcessoStatistics);
  });

  it('should fetch the flow graph from the API', () => {
    const mockResponse = '<svg><circle cx="50" cy="50" r="30"></circle></svg>'
    const mockSanitizedResponse = 'Sanitized HTML';

    sanitizerMock.bypassSecurityTrustHtml.and.returnValue(mockSanitizedResponse);

    service.fetchFlowGraph().subscribe((res) => {
      expect(res).toEqual(mockSanitizedResponse);
    });

    const req = httpTestingController.expectOne('/api/visualization/image/');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalled();
    expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
    expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalledWith(mockResponse);
  })
});
