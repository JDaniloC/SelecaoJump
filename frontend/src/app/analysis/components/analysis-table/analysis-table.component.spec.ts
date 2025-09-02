import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisTableComponent } from './analysis-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Processo } from '../../types/Processo';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AnalysisTableComponent', () => {
  let component: AnalysisTableComponent;
  let fixture: ComponentFixture<AnalysisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AnalysisTableComponent,
      ],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hould initialize data source with provided data', () => {
    const mockData: Processo[] = [
      { NPU: '123', pinnedMovimentoCount: 1, movimentosCount: 10, duration: 100 },
      { NPU: '456', pinnedMovimentoCount: 0, movimentosCount: 20, duration: 200 },
    ];

    component.data = mockData;
    component.ngOnChanges();

    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.data).toEqual(mockData);
  })

  it('should update the data source when data changes', () => {
    const mockdata: Processo[] = [
      { NPU: '123', pinnedMovimentoCount: 1, movimentosCount: 10, duration: 100 },
      { NPU: '456', pinnedMovimentoCount: 0, movimentosCount: 20, duration: 200 },
    ];

    component.data = mockdata;
    component.ngOnChanges();

    const updateData: Processo[] = [
      { NPU: '789', pinnedMovimentoCount: 1, movimentosCount: 10, duration: 100 },
    ]

    component.data = updateData;
    component.ngOnChanges();

    expect(component.dataSource).toBeTruthy();
    expect(component.dataSource.data).toEqual(updateData);
  })


  it('should check if data is empty', () => {
    component.data = [];
    expect(component.isEmpty()).toBe(true);

    component.data = [
      { NPU: '123', pinnedMovimentoCount: 1, movimentosCount: 10, duration: 100 },
    ];

    expect(component.isEmpty()).toBe(false);
  });
});
