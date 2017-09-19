import { Component, Pipe } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
})
@Pipe({name: 'round'})
export class AppComponent  { 
  
  title = "Enter city name:"
  cityName : String;
  geoLocationURL: String = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  geoLocationSuffixURL: String = "&key=AIzaSyC5LHTNfPj5lPuWYiM7ZYamWS4kYsOqJL0";
  country : string;
  errMsg : String;
  prefixUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
  apiKeyUrl: String = "&APPID=db42065604a53ad9c55ba0fb3724bd69";

  weatherDescription : String;
  temperatureCelcius : number;
  cloudiness : number;
  windSpeedPerKm : number;
  humidity : number;
  windClassification : String;


  constructor(private http: Http) { }
  queryWeather() {
    if (this.cityName) {

      let url = (this.prefixUrl + "" + this.cityName + this.apiKeyUrl);
      console.log(url);
      return this.http.get(url)
      // .subscribe(res => this.responseData = res.json());
      .subscribe(res => this.processWeatherJSON(res, res.json()));
  }
}




  processWeatherJSON(response: any, result: any) {
    let responseData = result;
    console.log(response.status);
    if (response.status == 404) {
        this.errMsg = "Invalid city name."
        console.log(this.errMsg);
    }
    this.weatherDescription = responseData.weather[0].description;
    this.temperatureCelcius = Math.floor(responseData.main.temp - 273.13);
    this.windSpeedPerKm = Math.floor(responseData.wind.speed * 3.6);
    this.humidity = responseData.main.humidity;
    this.cloudiness = responseData.clouds.all;
    this.windClassification = this.classifyWinds();
    let longitude = responseData.coord.lon;
    let latitude = responseData.coord.lat;
    this.queryLocation(longitude, latitude);
  }

  queryLocation(longitude: number, latitude: number) {
    let url = this.geoLocationURL + "" + latitude + "," + longitude + this.geoLocationSuffixURL;
    console.log(url);
    return this.http.get(url)
    // .subscribe(res => this.responseData = res.json());
    .subscribe(res => this.processLocationJSON(res.json()));

  }


  processLocationJSON(result : any) {
    let responseData = result;
    this.country = responseData.results[0].address_components[responseData.results[0].address_components.length - 1].long_name;
    var regexNum = /\d/g;
    this.fmtCountry(1, responseData)
    // if(regexNum.test(this.country)) {
    //   this.country = responseData.results[0].address_components[responseData.results[0].address_components.length - 2].long_name;
    // }
  }

  fmtCountry(index : number, res: any) {
    this.country = res.results[0].address_components[res.results[0].address_components.length - index].long_name;
    var regexNum = /\d/g;
    if(regexNum.test(this.country)) {
      this.fmtCountry(index+1, res);
    }
    return
  }

  classifyWinds() {
    if (this.windSpeedPerKm <= 11) {
      return "Calm/Light Breeze"
    } else if (this.windSpeedPerKm > 11 && this.windSpeedPerKm <= 28) {
      return "Moderate/Gentle Breeze"
    } else if (this.windSpeedPerKm > 28 && this.windSpeedPerKm <= 49) {
      return "Fresh/Strong Gale"
    } else if (this.windSpeedPerKm > 49 && this.windSpeedPerKm <= 88) {
      return "Strong wind/Gale"
    } else if (this.windSpeedPerKm > 88 && this.windSpeedPerKm < 117) {
      return "Whole gale"
    } else {
      return "Hurricane"
    }
  }
}
