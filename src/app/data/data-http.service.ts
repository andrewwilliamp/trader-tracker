import { inject, input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService {

  private apiKey = ''; // DELETE BEFORE COMMIT

  private http = inject(HttpClient);

  private ticker: string = 'AMRN';


  setTicker(ticker: string) {
    this.ticker = ticker;
  }

  getData(timeInterval: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
		  'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    });

    const httpOptions = {
      headers: headers
    };

    return this.http.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1' + timeInterval + '&region=US&symbol=' + this.ticker + '&range=5y&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit', httpOptions);
  }



}
