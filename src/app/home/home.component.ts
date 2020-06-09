import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private appId: string;
    private appCode: string;
    public weather: any;
    public constructor(private http: HttpClient) {
        this.appId="123"
        this.appCode="abc"
     }
    public ngOnInit():void { 
        this.getWeather({
            latitude:37.7397,
            longtitude:-121.4252
        });
    }
    public getWeather(position: any) {
        let params =new HttpParams({
            fromObject:{
                product:"forecast_7days_simple",
                latitude:position.latitude,
                longtitude:position.longtitude,
                app_id:this.appId,
                app_code:this.appCode
            }
        });
        this.http.get("https://weather.api.here.com/weather/1.0/report.json",{params:params})
        .pipe(map(result=>(<any>result).dailyForecasts.forecastLocation))
        .subscribe(result =>{
            this.weather=result.forecast;
            
        },error =>{
            console.error(error);
        })

     }
}