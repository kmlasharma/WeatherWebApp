"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var weather_component_1 = require("./weather.component");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.title = "Enter city name:";
        this.geoLocationURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
        this.geoLocationSuffixURL = "&key=AIzaSyC5LHTNfPj5lPuWYiM7ZYamWS4kYsOqJL0";
        this.apiKeyUrl = "&APPID=db42065604a53ad9c55ba0fb3724bd69";
        this.forecastPrefixURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
    }
    AppComponent.prototype.queryWeather = function () {
        var _this = this;
        this.weatherForecastComponents = [];
        var url = (this.forecastPrefixURL + "" + this.cityName + this.apiKeyUrl);
        console.log(url);
        return this.http.get(url)
            .subscribe(function (res) { return _this.processWeeklyForecast(res.json()); });
    };
    AppComponent.prototype.processWeatherJSON = function (response, result) {
        var responseData = result;
        if (response.status == 404) {
            this.errMsg = "Invalid city name.";
            console.log(this.errMsg);
        }
    };
    AppComponent.prototype.processWeeklyForecast = function (result) {
        var responseData = result;
        this.longitude = responseData.city.coord.lon;
        this.latitude = responseData.city.coord.lat;
        this.queryLocation(this.longitude, this.latitude);
        var weatherForecastArrayJSON = responseData.list;
        for (var _i = 0, weatherForecastArrayJSON_1 = weatherForecastArrayJSON; _i < weatherForecastArrayJSON_1.length; _i++) {
            var forecast = weatherForecastArrayJSON_1[_i];
            var date = new Date(forecast.dt * 1000);
            var desc = forecast.weather[0].description;
            var temperatureCelcius = Math.floor(forecast.main.temp - 273.13);
            var cloudiness = forecast.clouds.all;
            var windSpeedPerKm = Math.floor(forecast.wind.speed * 3.6);
            var humidity = forecast.main.humidity;
            var windClassification = this.classifyWinds(windSpeedPerKm);
            var wc = new weather_component_1.WeatherComponent(date, desc, temperatureCelcius, cloudiness, windSpeedPerKm, humidity, windClassification);
            this.weatherForecastComponents.push(wc);
        }
    };
    AppComponent.prototype.queryLocation = function (longitude, latitude) {
        var _this = this;
        var url = this.geoLocationURL + "" + latitude + "," + longitude + this.geoLocationSuffixURL;
        console.log(url);
        return this.http.get(url)
            .subscribe(function (res) { return _this.processLocationJSON(res.json()); });
    };
    AppComponent.prototype.processLocationJSON = function (result) {
        var responseData = result;
        this.country = responseData.results[0].address_components[responseData.results[0].address_components.length - 1].long_name;
        var regexNum = /\d/g;
        this.fmtCountry(1, responseData);
    };
    AppComponent.prototype.fmtCountry = function (index, res) {
        this.country = res.results[0].address_components[res.results[0].address_components.length - index].long_name;
        var regexNum = /\d/g;
        if (regexNum.test(this.country)) {
            this.fmtCountry(index + 1, res);
        }
        return;
    };
    AppComponent.prototype.classifyWinds = function (windSpeedPerKm) {
        if (windSpeedPerKm <= 11) {
            return "Calm/Light Breeze";
        }
        else if (windSpeedPerKm > 11 && windSpeedPerKm <= 28) {
            return "Moderate/Gentle Breeze";
        }
        else if (windSpeedPerKm > 28 && windSpeedPerKm <= 49) {
            return "Fresh/Strong Gale";
        }
        else if (windSpeedPerKm > 49 && windSpeedPerKm <= 88) {
            return "Strong wind/Gale";
        }
        else if (windSpeedPerKm > 88 && windSpeedPerKm < 117) {
            return "Whole gale";
        }
        else {
            return "Hurricane";
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styles: ["\n    agm-map {\n      height: 300px;\n      width: 500px;\n    }\n  "],
        templateUrl: 'app/app.component.html',
    }),
    core_1.Pipe({
        name: 'round'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map