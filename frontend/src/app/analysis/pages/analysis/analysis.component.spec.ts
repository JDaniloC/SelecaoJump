import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisFacade } from '../../analysis.facade';
import { of } from 'rxjs';
import { AnalysisComponent } from './analysis.component';
import { Processo } from '../../types/Processo';
import { AnalysisTableComponent } from '../../components/analysis-table/analysis-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;
  let mockFacade: Partial<AnalysisFacade>;

  beforeEach(async () => {
    mockFacade = {
      getMovimentoSelected: () => of('A2'),
      getProcessoData: () => of({} as Processo[]),
    };

    await TestBed.configureTestingModule({
      imports: [ MatCardModule, MatPaginatorModule ],
      declarations: [ AnalysisComponent, AnalysisTableComponent ],
      providers: [{
        provide: AnalysisFacade,
        useValue: mockFacade
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsusbscribe form subscriptions on component destroy', () => {
    spyOn(component.subscription1$, 'unsubscribe');
    spyOn(component.subscription2$, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription1$.unsubscribe).toHaveBeenCalled();
    expect(component.subscription2$.unsubscribe).toHaveBeenCalled();
  })
});
