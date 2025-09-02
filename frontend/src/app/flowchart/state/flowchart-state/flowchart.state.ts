import { Injectable } from '@angular/core';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';
import { BehaviorSubject } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

@Injectable()
export class FlowchartState {
  private readonly processoStatistics = new BehaviorSubject(
    {} as ProcessoStatistics
  );
  private readonly flowgraph = new BehaviorSubject({} as SafeHtml);
  private readonly queryParams = new BehaviorSubject(
    'A1'
    );

  public getProcessoStatistics() {
    return this.processoStatistics.asObservable();
  }

  public getFlowgraph() {
    return this.flowgraph.asObservable();
  }

  public getQueryParams() {
    return this.queryParams.asObservable();
  }

  public setProcessoStatistics(processoStatistics: ProcessoStatistics) {
    this.processoStatistics.next(processoStatistics);
  }

  public setFlowgraph(flowgraph: SafeHtml) {
    this.flowgraph.next(flowgraph);
  }

  public setQueryParams(movimento: string) {
      this.queryParams.next(movimento);
  }
}
