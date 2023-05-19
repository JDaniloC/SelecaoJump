import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
