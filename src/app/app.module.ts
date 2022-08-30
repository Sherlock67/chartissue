import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarchartComponent } from './barchart/barchart.component';
import { NewBarComponentComponent } from './shared/new-bar-component/new-bar-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    NewBarComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
