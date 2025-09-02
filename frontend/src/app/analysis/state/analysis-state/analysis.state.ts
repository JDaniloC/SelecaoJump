import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Processo } from '../../types/Processo';

@Injectable()
export class AnalysisState {
  private readonly processoData = new BehaviorSubject([] as Processo[]);
  private readonly movimentoSelected = new BehaviorSubject('-');

  public getProcessoData() {
    return this.processoData.asObservable();
  }

  public setProcessoData(processoData: Processo[]) {
    this.processoData.next(processoData);
  }

  public getMovimentoSelected() {
    return this.movimentoSelected.asObservable();
  }

  public setMovimentoSelected(movimento: string) {
    this.movimentoSelected.next(movimento);
  }
}
