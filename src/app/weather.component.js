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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var WeatherComponent = (function () {
    function WeatherComponent(date, weatherDescription, 
        // temperatureCelcius : number;
        temperatureCelcius, cloudiness, windSpeedPerKm, humidity, windClassification) {
        this.date = date;
        this.weatherDescription = weatherDescription;
        this.temperatureCelcius = temperatureCelcius;
        this.cloudiness = cloudiness;
        this.windSpeedPerKm = windSpeedPerKm;
        this.humidity = humidity;
        this.windClassification = windClassification;
    }
    return WeatherComponent;
}());
WeatherComponent = __decorate([
    core_1.Component({
        selector: 'weatherComponent',
        templateUrl: 'app/app.component.html',
    }),
    __metadata("design:paramtypes", [Date, String, Number, Number, Number, Number, String])
], WeatherComponent);
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map