import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration, Duration } from 'date-fns';

@Pipe({
  name: 'durationTimeBySeconds',
})
export class DurationTimeBySecondsPipe implements PipeTransform {
  private durationToString(time: Duration): string {
    const { years, months, days, hours, minutes } = time;
    let returnString = '';
    if (years) {
      returnString += years == 1 ? '1 ano ' : `${years} anos `;
    }
    if (months) {
      returnString += months == 1 ? '1 mês ' : `${months} meses `;
    }
    if ((!years || !months) && days) {
      returnString += days == 1 ? '1 dia ' : `${days} dias `;
    }
    if (
      (!years || !months) &&
      (!months || !days) &&
      (!years || !days) &&
      hours
    ) {
      returnString += hours == 1 ? '1 hora ' : `${hours} horas `;
    }
    if (
      (!years || !months) &&
      (!months || !days) &&
      (!years || !days) &&
      (!years || !hours) &&
      (!months || !hours) &&
      (!days || !hours) &&
      minutes
    ) {
      returnString += minutes == 1 ? '1 minuto' : `${minutes} minutos`;
    }

    return returnString.trim();
  }

  transform(value: number, ...args: unknown[]): unknown {
    if (!value || value < 0) return 'Sem duração';
    if (value < 60) return value == 1 ? '1 segundo' : `${value} segundos`;
    const time: Duration = intervalToDuration({ start: 0, end: value * 1000 });
    return this.durationToString(time);
  }
}
