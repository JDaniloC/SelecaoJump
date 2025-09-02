import { Component, OnDestroy } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnDestroy {
  selectedMovimento: string = 'Expedição de movimento';
  processoList: Processo[] = [];
  subscription1$!: Subscription
  subscription2$!: Subscription

  constructor(private readonly facade: AnalysisFacade) {
    this.subscription1$ = facade.getProcessoData()
      .subscribe((processoData: Processo[]) => {
        this.processoList = processoData;
      });
    this.subscription2$ = this.facade.getMovimentoSelected()
      .subscribe((movimentoSelected: string) => {
        this.selectedMovimento = movimentoSelected;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription1$) {
      this.subscription1$.unsubscribe();
    }
    if (this.subscription2$) {
      this.subscription2$.unsubscribe();
    }
  }
}
