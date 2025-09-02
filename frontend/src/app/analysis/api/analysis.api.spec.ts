import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AnalysisApi } from './analysis.api';

describe('AnalysisApiService', () => {
  let api: AnalysisApi;
  let httpMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj<HttpClient>('HttpClient', [
      'get'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AnalysisApi,
        { provide: HttpClient, useValue: httpMock }
      ]
    });

    api = TestBed.inject(AnalysisApi);
  });

  it('should be created', () => {
    expect(api).toBeTruthy();
  });
});
