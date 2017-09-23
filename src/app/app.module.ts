import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather.component';
import { GraphsComponent } from './graphs.component';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

 

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, ChartsModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDRaIRPZpg5nS5wSQec2z20i3lvJjcHqA8'
    })],
  declarations: [AppComponent, WeatherComponent, GraphsComponent],
  bootstrap: [AppComponent],
})

export class AppModule { }

