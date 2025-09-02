import { TestBed } from '@angular/core/testing';
import { DurationTimeBySecondsPipe } from './duration-time-by-seconds.pipe';

describe('DurationTimeBySecondsPipe', () => {
  let pipe: DurationTimeBySecondsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DurationTimeBySecondsPipe]
    });
    pipe = TestBed.inject(DurationTimeBySecondsPipe);
  })

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Sem dureção" when the value is 0 or less', () => {
    expect(pipe.transform(0)).toEqual('Sem duração');
    expect(pipe.transform(-1)).toEqual('Sem duração');
  });

  it('should return value in seconds when value is less than 60', () => {
    expect(pipe.transform(1)).toBe('1 segundo');
    expect(pipe.transform(59)).toBe('59 segundos');
  });

  it('should return value in minutes when value is less than 3600', () => {
    expect(pipe.transform(60)).toBe('1 minuto');
    expect(pipe.transform(3599)).toBe('59 minutos');
  });

  it('should return value in hours when value is less than 86400', () => {
    expect(pipe.transform(3600)).toBe('1 hora');
    expect(pipe.transform(86399)).toBe('23 horas 59 minutos');
  });

  it('should return value in days when value is less than 2592000', () => {
    expect(pipe.transform(86400)).toBe('1 dia');
    expect(pipe.transform(2591999)).toBe('29 dias 23 horas');
  });

  it('should return value in months when value is less than 31536000', () => {
    expect(pipe.transform(2592000)).toBe('30 dias');
    expect(pipe.transform(31535999)).toBe('11 meses 30 dias');
  });

  it('should return value in years when value is more than 31536000', () => {
    expect(pipe.transform(31536000)).toBe('1 ano');
    expect(pipe.transform(31536000 + 31535999)).toBe('1 ano 11 meses');
  });

  it('should return value in years, months and days when value is more than 31536000', () => {
    expect(pipe.transform(31536000 + 2592000 + 86400)).toBe('1 ano 1 mês');
  });

  it('should return value in years, months, days, hours and minutes when value is more than 31536000', () => {
    expect(pipe.transform(31536000 + 2592000 + 86400 + 3600 + 60)).toBe('1 ano 1 mês');

    expect(pipe.transform(31536000 + 2592000 + 86400 + 3600 + 60 + 1)).toBe('1 ano 1 mês');
  });
});
