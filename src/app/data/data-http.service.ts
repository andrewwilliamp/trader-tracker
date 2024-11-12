import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SummaryStockDataDto } from './summary-stock-data.dto';
import { environment } from '../../../environment';

export class DataService {

  private http: HttpClient = inject(HttpClient);

  private ticker: string;
  private timeInterval: string;
  private timeRange: string;

  private api = new BehaviorSubject<any>(null);
  readonly api$ = this.api.asObservable();

  updateData(data: any) {
    this.api.next(data);
  }


  constructor() {
    // set default values
    this.ticker = 'AMRN';
    this.timeInterval = '1mo';
    this.timeRange = '5y';

  }


  setTicker(ticker: string) {
    this.ticker = ticker;
  }

  // setRange(rangeNumber: string | number, rangeInterval: string) {
  //   this.rangeNumber = rangeNumber;
  //   this.rangeUnit = rangeInterval;
  // }

  // setTimeInterval(
  //   timeIntervalNumber: string | number,
  //   timeIntervalUnit: string
  // ) {
  //   this.timeIntervalNumber = timeIntervalNumber;
  //   this.timeIntervalUnit = timeIntervalUnit;
  // }

  getData(timeInterval?: string, timeRange?: string): Observable<SummaryStockDataDto> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': environment.apiKey,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    });


    const httpOptions = {
      headers: headers,
    };

    if (timeInterval) {
      this.timeInterval = timeInterval;
    }

    if (timeRange) {
      this.timeRange = timeRange;
    }

    let http = this.http
      .get<SummaryStockDataDto>(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=' +
          this.timeInterval +
          '&region=US&symbol=' +
          this.ticker +
          '&range=' +
          this.timeRange +
          '&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit',
        httpOptions
      )

    this.updateData(http);
    return http;

  }
}
