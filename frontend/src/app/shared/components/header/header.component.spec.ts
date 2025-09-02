import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header.component';
import { DarkThemeService } from '../../services/dark-theme/dark-theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        DarkThemeService,
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // This is important to update the component with the new value
    fixture.detectChanges();
  })

  it('should creata the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo image', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.logo-image')).toBeTruthy();
    expect(compiled.querySelector('.logo-image').src).toContain('assets/logo.webp');
  });

  it ('should have a "Fluxograma" link', () => {
    const link = fixture.nativeElement.querySelector('span');
    expect(link).toBeTruthy();

    const icon = link.querySelector('mat-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('account_tree');

    const text = link.querySelector('p');
    expect(text).toBeTruthy();
    expect(text.textContent.trim()).toBe('Fluxograma');
  })

  it('should have a "Análise de processos" link', () => {
    const link = fixture.nativeElement.querySelectorAll('span')[1];
    expect(link).toBeTruthy();

    const icon = link.querySelector('mat-icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe('cases');

    const text = link.querySelector('p');
    expect(text).toBeTruthy();
    expect(text.textContent.trim()).toBe('Análise de processos');
  })
});
