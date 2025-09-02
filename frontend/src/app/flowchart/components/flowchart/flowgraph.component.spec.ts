import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowchartFacade } from '../../flowchart.facade';
import { Router } from '@angular/router';
import { DarkThemeService } from 'src/app/shared/services/dark-theme/dark-theme.service';
import { FlowgraphComponent } from './flowgraph.component';
import { MatCardModule } from '@angular/material/card';

describe('FlowgraphComponent', () => {
  let component: FlowgraphComponent;
  let fixture: ComponentFixture<FlowgraphComponent>;
  let facadeMock: jasmine.SpyObj<FlowchartFacade>;
  let routerMock: jasmine.SpyObj<Router>;
  let darkThemeMock: jasmine.SpyObj<DarkThemeService>;

  beforeEach(async () => {
    facadeMock = jasmine.createSpyObj<FlowchartFacade>('FlowchartFacade', [
      'setQueryParams'
    ]);
    routerMock = jasmine.createSpyObj<Router>('Router', [
      'navigate'
    ]);
    darkThemeMock = jasmine.createSpyObj<DarkThemeService>('DarkThemeService', [
      'turnGraphDarkMode'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ FlowgraphComponent ],
      imports: [MatCardModule],
      providers: [
        { provide: FlowchartFacade, useValue: facadeMock },
        { provide: Router, useValue: routerMock },
        { provide: DarkThemeService, useValue: darkThemeMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowgraphComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call darkMode after the view has been initialized',
  () => {
    spyOn(component, 'modifyGraph');
    spyOn(component, 'renderSvgPanZoom');

    fixture.detectChanges();
    component.ngAfterViewInit();

    expect(darkThemeMock.turnGraphDarkMode).toHaveBeenCalled();
  });

  it('should call setQueryParams and navigate when setMovimentacao is called',
  () => {
    const movimentacao = " A3 "
    component.setMovimentacao(movimentacao);

    expect(facadeMock.setQueryParams).toHaveBeenCalledWith(
      movimentacao.trim()
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(['/analysis']);
  });

  it('should return true for isNotEmpty when graphSource is not empty', () => {
    component.graphSource = '<svg></svg>';

    expect(component.isNotEmpty()).toBeTrue();
  })

  it('should return false for isNotEmpty when graphSource is empty', () => {
    component.graphSource = '';

    expect(component.isNotEmpty()).toBeFalse();
  });

  it('should return false for isNotEmpty when graphShource is {}', () => {
    component.graphSource = {};

    expect(component.isNotEmpty()).toBeFalse();
  })
});
