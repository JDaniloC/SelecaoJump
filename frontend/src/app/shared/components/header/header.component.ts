import { Component } from '@angular/core';
import { DarkThemeService } from '../../services/dark-theme/dark-theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor (private readonly darkThemeService: DarkThemeService) { }

  public darkMode() {
    this.darkThemeService.darkMode();
    this.darkThemeService.turnGraphDarkMode();
  }

}
