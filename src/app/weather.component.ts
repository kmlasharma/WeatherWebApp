import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
 
@Component({
  selector: 'weatherComponent',
  templateUrl: 'app/app.component.html',
})
 
export class WeatherComponent  {
 
  constructor(public date: Date, public weatherDescription : String,
  // temperatureCelcius : number;
  public temperatureCelcius : number,
 
  public cloudiness : number,
  public windSpeedPerKm : number,
  public humidity : number,
  public windClassification : String)
  // windClassification : String;
  {}
 
}