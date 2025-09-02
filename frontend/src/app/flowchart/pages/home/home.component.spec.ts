import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowchartFacade } from '../../flowchart.facade';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { StatisticsComponent } from '../../components/statistics/statistics.component';
import { FlowgraphComponent } from '../../components/flowchart/flowgraph.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let facadeMock: Partial<FlowchartFacade>;

  beforeEach(async () => {
    // Only necessary to tests:
    facadeMock = {
      getFlowgraph: () => of('<svg></svg>'),
      getProcessoStatistics: () => of({} as ProcessoStatistics)
    };

    await TestBed.configureTestingModule({
      imports: [ MatCardModule, SharedModule, MatDividerModule ],
      declarations: [ HomeComponent, StatisticsComponent, FlowgraphComponent ],
      providers: [
        { provide: FlowchartFacade, useValue: facadeMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set statisticsData from the facade', () => {
    const mockStatisticsData: ProcessoStatistics = {
      movimentosCount: 1,
      avgCaseDuration: 2,
      avgMovimentoDuration: 3,
      avgMovimentosPerCase: 4,
      casesCount: 5
    }

    facadeMock.getProcessoStatistics = () => of(mockStatisticsData);

    facadeMock.getProcessoStatistics().subscribe((data) => {
      component.statisticsData = data;
    })

    expect(component.statisticsData).toEqual(mockStatisticsData);
  })

  it('should set graphSource from the facade', () => {
    const mockGraphSource = '<svg></svg>';

    facadeMock.getFlowgraph = () => of(mockGraphSource);

    expect(component.graphSource).toEqual(mockGraphSource);
  });

  it('should return true for isEmpty when graphSource is empty', () => {
    component.graphSource = '';

    expect(component.isEmpty()).toBeTrue();
  })

  it('should return true for isEmpty when graphSource is null', () => {
    component.graphSource = null;

    expect(component.isEmpty()).toBeTrue();
  })

  it('should return false for isEmpty when graphSource is not empty', () => {
    component.graphSource = {
      changingThisBreaksApplicationSecurity: 'mock'
    };

    expect(component.isEmpty()).toBeFalse();
  });

  it('should unsubscribe from subscriptions on component destroy', () => {
    const subscription1 = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    const subscription2 = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscription1$ = subscription1;
    component.subscription2$ = subscription2;

    component.ngOnDestroy();

    expect(subscription1.unsubscribe).toHaveBeenCalled();
    expect(subscription2.unsubscribe).toHaveBeenCalled();
  })
});
