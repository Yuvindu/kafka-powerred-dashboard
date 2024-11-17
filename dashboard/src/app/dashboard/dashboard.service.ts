import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseApiUrl = 'http://localhost:3001/cache/list';

  constructor(private http: HttpClient) {}

  getTemperatureData(): Observable<any> {
    const url = `${this.baseApiUrl}?key=temperature-data&start=0&end=119&hourEnd=7199`;
    return this.http.get<any>(url);
  }

  getHumidityData(): Observable<any> {
    const url = `${this.baseApiUrl}?key=humidity-data&start=0&end=59&hourEnd=3599`;
    return this.http.get<any>(url);
  }

  getProductCountData(): Observable<any> {
    const url = `${this.baseApiUrl}?key=product-count-data&start=0&end=11&hourEnd=719`;
    return this.http.get<any>(url);
  }

  getDashboardData(): Observable<any> {
    return interval(15000).pipe(  
      startWith(0),
      switchMap(() => {
        return forkJoin({
          temperature: this.getTemperatureData(),
          humidity: this.getHumidityData(),
          productCount: this.getProductCountData()
        });
      })
    );
  }
}
