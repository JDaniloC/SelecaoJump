import { Component, OnDestroy } from '@angular/core';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';
import { Subscription } from 'rxjs';
import { FlowchartFacade } from '../../flowchart.facade';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  statisticsData: ProcessoStatistics = {} as ProcessoStatistics;
  graphSource!: SafeHtml | null;
  subscription1$!: Subscription;
  subscription2$!: Subscription;

  constructor(
    private readonly facade: FlowchartFacade,
  ) {
    this.subscription2$ = facade
      .getFlowgraph()
      .subscribe((flowchart: SafeHtml) => {
        this.graphSource = flowchart;
      });
    this.subscription1$ = facade
      .getProcessoStatistics()
      .subscribe((processoStatistics: ProcessoStatistics) => {
        this.statisticsData = processoStatistics;
      });
  }

  isEmpty(): boolean {
    let graphSource = this.graphSource;
    return (
      graphSource === '' ||
      JSON.stringify(graphSource) === '{}' ||
      typeof graphSource === 'undefined' ||
      graphSource === null
    );
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
