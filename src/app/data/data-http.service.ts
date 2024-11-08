import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SummaryStockDataDto } from './summary-stock-data.dto';
import { environment } from '../../../environment';

export class DataService {

  private ticker: string = 'AMRN';
  private timeIntervalNumber: string | number = 1;
  private timeIntervalUnit: string = 'mo';
  private rangeNumber: string | number = 5;
  private rangeInterval: string = 'y';

  private http: HttpClient;

  constructor() {
    this.ticker = 'AMRN';
    this.timeIntervalNumber = 1;
    this.timeIntervalUnit = 'mo';
    this.rangeNumber= 5;
    this.rangeInterval = 'y';

    this.http = inject(HttpClient);
  }


  setTicker(ticker: string) {
    this.ticker = ticker;
  }

  setRange(rangeNumber: string | number, rangeInterval: string) {
    this.rangeNumber = rangeNumber;
    this.rangeInterval = rangeInterval;
  }

  setTimeInterval(
    timeIntervalNumber: string | number,
    timeIntervalUnit: string
  ) {
    this.timeIntervalNumber = timeIntervalNumber;
    this.timeIntervalUnit = timeIntervalUnit;
  }

  getData(): Observable<SummaryStockDataDto> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': environment.apiKey,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    });


    const httpOptions = {
      headers: headers,
    };

    return this.http
      .get<SummaryStockDataDto>(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=' +
          this.timeIntervalNumber +
          this.timeIntervalUnit +
          '&region=US&symbol=' +
          this.ticker +
          '&range=' +
          this.rangeNumber +
          this.rangeInterval +
          '&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit',
        httpOptions
      )
  }
}
