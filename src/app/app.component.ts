import {
    Component,
    Pipe
} from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {
    WeatherComponent
} from './weather.component';
import { AgmCoreModule } from '@agm/core';
import { GraphsComponent } from './graphs.component';
import { ChartModule }            from 'angular2-highcharts'; 


@Component({
    selector: 'my-app',
    styles: [`
    agm-map {
      height: 300px;
      width: 500px;
    }
  `],
    templateUrl: 'app/app.component.html',
})



@Pipe({
    name: 'round'
})
export class AppComponent {
    title = "Enter city name:"
    cityName: String;
    geoLocationURL: String = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    geoLocationSuffixURL: String = "&key=AIzaSyC5LHTNfPj5lPuWYiM7ZYamWS4kYsOqJL0";
    country: string;
    errMsg: String;
    apiKeyUrl: String = "&APPID=db42065604a53ad9c55ba0fb3724bd69";
    weatherForecastComponents: WeatherComponent[];
    forecastPrefixURL: String = "http://api.openweathermap.org/data/2.5/forecast?q=";
    latitude: number;
    longitude: number;
    options: Object;

    constructor(private http: Http) {}

    queryWeather() {
        this.weatherForecastComponents = [];
        let url = (this.forecastPrefixURL + "" + this.cityName + this.apiKeyUrl);
        console.log(url);
        return this.http.get(url)
            // .subscribe(res => this.responseData = res.json());
            .subscribe(res => this.processWeeklyForecast(res.json()));
    }


    processWeeklyForecast(result: any) {
        let responseData = result;

        this.longitude = responseData.city.coord.lon;
        this.latitude = responseData.city.coord.lat;
        this.queryLocation(this.longitude, this.latitude);

        let weatherForecastArrayJSON = responseData.list;
        for (let forecast of weatherForecastArrayJSON) {
            let date = new Date(forecast.dt * 1000);
            let desc = forecast.weather[0].description;
            let temperatureCelcius = Math.floor(forecast.main.temp - 273.13);
            let cloudiness = forecast.clouds.all;
            let windSpeedPerKm = Math.floor(forecast.wind.speed * 3.6);
            let humidity = forecast.main.humidity;
            let windClassification = this.classifyWinds(windSpeedPerKm);
            let wc = new WeatherComponent(date, desc, temperatureCelcius, cloudiness, windSpeedPerKm, humidity, windClassification);
            this.weatherForecastComponents.push(wc);
        }
        this.startGraphing();

    }


    startGraphing() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
        console.log(this.options)
    }

    queryLocation(longitude: number, latitude: number) {
        let url = this.geoLocationURL + "" + latitude + "," + longitude + this.geoLocationSuffixURL;
        console.log(url);
        return this.http.get(url)
            // .subscribe(res => this.responseData = res.json());
            .subscribe(res => this.processLocationJSON(res.json()));
    }



    processLocationJSON(result: any) {
        let responseData = result;
        this.country = responseData.results[0].address_components[responseData.results[0].address_components.length - 1].long_name;
        var regexNum = /\d/g;
        this.fmtCountry(1, responseData)
    }



    fmtCountry(index: number, res: any) {
        this.country = res.results[0].address_components[res.results[0].address_components.length - index].long_name;
        var regexNum = /\d/g;
        if (regexNum.test(this.country)) {
            this.fmtCountry(index + 1, res);
        }
        return
    }



    classifyWinds(windSpeedPerKm: number) {
        if (windSpeedPerKm <= 11) {
            return "Calm/Light Breeze"
        } else if (windSpeedPerKm > 11 && windSpeedPerKm <= 28) {
            return "Moderate/Gentle Breeze"
        } else if (windSpeedPerKm > 28 && windSpeedPerKm <= 49) {
            return "Fresh/Strong Gale"
        } else if (windSpeedPerKm > 49 && windSpeedPerKm <= 88) {
            return "Strong wind/Gale"
        } else if (windSpeedPerKm > 88 && windSpeedPerKm < 117) {
            return "Whole gale"
        } else {
            return "Hurricane"
        }
    }
}