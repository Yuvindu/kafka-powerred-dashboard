import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  avgTemperatureMinute: number = 0;
  maxTemperatureMinute: number = 0;
  avgTemperatureHour: number = 0;
  maxTemperatureHour: number = 0;
  avgHumidityMinute: number = 0;
  maxHumidityMinute: number = 0;
  avgHumidityHour: number = 0;
  maxHumidityHour: number = 0;
  maxHumidity: number = 0;
  avgProductCountMinute: number = 0;
  maxProductCountMinute: number = 0;
  avgProductCountHour: number = 0;
  maxProductCountHour: number = 0;

  

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.avgTemperatureMinute = data.temperature.avgTempMinute;
      this.maxTemperatureMinute = data.temperature.maxTempMinute;
      this.avgTemperatureHour = data.temperature.avgTempHour;
      this.maxTemperatureHour = data.temperature.maxTempHour;
      this.avgHumidityMinute = data.humidity.avgHumidityMinute;
      this.maxHumidityMinute = data.humidity.maxHumidityMinute;
      this.avgHumidityHour = data.humidity.avgHumidityHour;
      this.maxHumidityHour = data.humidity.maxHumidityHour;
      this.avgProductCountMinute = data.productCount.avgProductCountMinute;
      this.maxProductCountMinute = data.productCount.maxProductCountMinute;
      this.avgProductCountHour = data.productCount.avgProductCountHour;
      this.maxProductCountHour = data.productCount.maxProductCountHour;
    });
  }
}