import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';
import { map, take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class FlowchartApi {

  constructor(private readonly http: HttpClient, private sanitizer: DomSanitizer) { }

  public fetchFlowGraph() {
		return this.http.get('/api/visualization/image/', {
			responseType: 'text',
        }).pipe(take(1),
                map((res: string) =>
                    this.sanitizer.bypassSecurityTrustHtml(res)
        ))
  }

  public fetchProcessoStatistics() {
    return this.http.get<ProcessoStatistics>('/api/processos/stats/');
  }
}
