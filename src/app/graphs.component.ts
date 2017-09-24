import {
    Component
} from '@angular/core';
import { WeatherComponent } from './weather.component';
import { ChartModule }            from 'angular2-highcharts'; 

@Component({
    selector: 'graphs',
    templateUrl: 'app/graphs.component.html',
    styles: [`
      chart {
        display: block;
      }
    `],
})


export class GraphsComponent {

	weatherForecastData: WeatherComponent[] = [];
	title = "Me graphs go here"
    options: Object;

	constructor() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
        // this.weatherForecastData = weatherForecastComponents;
    }
}

