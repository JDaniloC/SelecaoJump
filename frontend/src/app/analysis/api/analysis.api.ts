import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProcessoParams } from '../types/processoParams';
import { Processo } from '../types/Processo';

@Injectable()
export class AnalysisApi {

  constructor(private readonly http: HttpClient) { }

  public fetchProcessosData({ movimento }: ProcessoParams) {
    // https://rxjs.dev/deprecations/to-promise
    return firstValueFrom(this.http.get<Processo[]>(
      `/api/processos?movimento=${movimento}`
    ));
  }
}
