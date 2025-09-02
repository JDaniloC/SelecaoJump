import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { AnalysisState } from './state/analysis-state/analysis.state';
import { AnalysisApi } from './api/analysis.api';
import { AnalysisFacade } from './analysis.facade';
import { analysisInitializerProvider } from './analysis.initializer';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisTableComponent } from './components/analysis-table/analysis-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  providers: [
    AnalysisState,
    AnalysisApi,
    AnalysisFacade,
    analysisInitializerProvider
  ],
  declarations: [
    AnalysisComponent,
    AnalysisTableComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    AnalysisRoutingModule,
  ]
})
export class AnalysisModule { }
