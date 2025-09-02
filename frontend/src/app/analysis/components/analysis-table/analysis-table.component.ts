import {
  Input,
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Processo } from '../../types/Processo';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-analysis-table',
  templateUrl: './analysis-table.component.html',
  styleUrls: ['./analysis-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisTableComponent implements AfterViewInit, OnChanges {
  @Input() data: readonly Processo[] = [];
  @Input() displayedColumns: string[] = [
    'NPU', 'pinnedMovimentoCount', 'movimentosCount', 'duration'
  ];

  dataSource!: MatTableDataSource<Processo>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  updateData(): void {
    const data = Object.assign([], this.data);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  ngAfterViewInit(): void {
    this.updateData();
  }

  ngOnChanges(): void {
    this.updateData();
  }
}
