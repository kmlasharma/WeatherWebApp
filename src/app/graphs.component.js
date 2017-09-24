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
var GraphsComponent = (function () {
    function GraphsComponent() {
        this.weatherForecastData = [];
        this.title = "Me graphs go here";
        this.options = {
            title: { text: 'simple chart' },
            series: [{
                    data: [29.9, 71.5, 106.4, 129.2],
                }]
        };
        // this.weatherForecastData = weatherForecastComponents;
    }
    return GraphsComponent;
}());
GraphsComponent = __decorate([
    core_1.Component({
        selector: 'graphs',
        templateUrl: 'app/graphs.component.html',
        styles: ["\n      chart {\n        display: block;\n      }\n    "],
    }),
    __metadata("design:paramtypes", [])
], GraphsComponent);
exports.GraphsComponent = GraphsComponent;
//# sourceMappingURL=graphs.component.js.map