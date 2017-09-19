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
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.title = "Enter city name:";
        this.geoLocationURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
        this.geoLocationSuffixURL = "&key=AIzaSyC5LHTNfPj5lPuWYiM7ZYamWS4kYsOqJL0";
        this.prefixUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
        this.apiKeyUrl = "&APPID=db42065604a53ad9c55ba0fb3724bd69";
    }
    AppComponent.prototype.queryWeather = function () {
        var _this = this;
        if (this.cityName) {
            var url = (this.prefixUrl + "" + this.cityName + this.apiKeyUrl);
            console.log(url);
            return this.http.get(url)
                .subscribe(function (res) { return _this.processWeatherJSON(res, res.json()); });
        }
    };
    AppComponent.prototype.processWeatherJSON = function (response, result) {
        var responseData = result;
        console.log(response.status);
        if (response.status == 404) {
            this.errMsg = "Invalid city name.";
            console.log(this.errMsg);
        }
        this.weatherDescription = responseData.weather[0].description;
        this.temperatureCelcius = Math.floor(responseData.main.temp - 273.13);
        this.windSpeedPerKm = Math.floor(responseData.wind.speed * 3.6);
        this.humidity = responseData.main.humidity;
        this.cloudiness = responseData.clouds.all;
        this.windClassification = this.classifyWinds();
        var longitude = responseData.coord.lon;
        var latitude = responseData.coord.lat;
        this.queryLocation(longitude, latitude);
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
        // if(regexNum.test(this.country)) {
        //   this.country = responseData.results[0].address_components[responseData.results[0].address_components.length - 2].long_name;
        // }
    };
    AppComponent.prototype.fmtCountry = function (index, res) {
        this.country = res.results[0].address_components[res.results[0].address_components.length - index].long_name;
        var regexNum = /\d/g;
        if (regexNum.test(this.country)) {
            this.fmtCountry(index + 1, res);
        }
        return;
    };
    AppComponent.prototype.classifyWinds = function () {
        if (this.windSpeedPerKm <= 11) {
            return "Calm/Light Breeze";
        }
        else if (this.windSpeedPerKm > 11 && this.windSpeedPerKm <= 28) {
            return "Moderate/Gentle Breeze";
        }
        else if (this.windSpeedPerKm > 28 && this.windSpeedPerKm <= 49) {
            return "Fresh/Strong Gale";
        }
        else if (this.windSpeedPerKm > 49 && this.windSpeedPerKm <= 88) {
            return "Strong wind/Gale";
        }
        else if (this.windSpeedPerKm > 88 && this.windSpeedPerKm < 117) {
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
        templateUrl: 'app/app.component.html',
    }),
    core_1.Pipe({ name: 'round' }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map