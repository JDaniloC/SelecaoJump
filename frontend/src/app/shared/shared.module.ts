import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { DurationTimeBySecondsPipe } from './pipes/duration-time-by-seconds.pipe';
import { DarkThemeService } from './services/dark-theme/dark-theme.service';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    HeaderComponent,
    DurationTimeBySecondsPipe
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [
    DarkThemeService
  ],
  bootstrap: [],
  exports: [
    HeaderComponent,
    DurationTimeBySecondsPipe,
    MatCardModule
  ]
})
export class SharedModule { }
