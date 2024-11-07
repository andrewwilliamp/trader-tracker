import { inject, input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeAll, Observable } from 'rxjs';

export interface getChartDto {
  chart: {
    result: {
      0: {
        meta: {
          currency: string | null;
          symbol: string | null;
          exchangeName: string | null;
          fullExchangeName: string | null;
          instrumentType: string | null;
          firstTradeDate: number | null;
          regularMarketTime: number | null;
          hasPrePostMarketData:true
          gmtoffset: number | null;
          timezone: string | null;
          exchangeTimezoneName: string | null;
          regularMarketPrice: number | null;
          fiftyTwoWeekHigh: number | null;
          fiftyTwoWeekLow: number | null;
          regularMarketDayHigh: number | null;
          regularMarketDayLow: number | null;
          regularMarketVolume: number | null;
          longName: string | null;
          shortName: string | null;
          chartPreviousClose: number | null;
          priceHint: number | null;
        },
        timestamp: [],
        indicators: {
          quote: {
            0: {
              volume: [],
              high: [],
              low: [],
              open: [],
              close: []
            }
          },
          adjclose: []
        }
      }
    },
    error: string | null;
  }
}

export class DataService {
  private apiKey = ''; // DELETE BEFORE COMMIT

  private http = inject(HttpClient);

  private ticker: string = 'AMRN';
  private timeIntervalNumber: string | number = 1;
  private timeIntervalUnit: string = 'mo';
  private rangeNumber: string | number = 5;
  private rangeInterval: string = 'y';

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

  getData(): Observable<getChartDto> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    });

    const httpOptions = {
      headers: headers,
    };

    return this.http
      .get<getChartDto>(
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
