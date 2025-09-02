import { Component, HostListener, Input } from '@angular/core';
import { ProcessoStatistics } from '../../types/ProcessoStatistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  @Input() data: ProcessoStatistics = {} as ProcessoStatistics;

  public getScreenWidth: any;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
}
