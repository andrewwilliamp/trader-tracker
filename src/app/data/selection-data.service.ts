import { BehaviorSubject } from "rxjs";

export class SelectionDataService {

  private tableHeader = new BehaviorSubject<any>(null);
  readonly tableHeader$ = this.tableHeader.asObservable();

  private timeInterval = new BehaviorSubject<any>(null);
  readonly timeInterval$ = this.timeInterval.asObservable();

  private timeRange = new BehaviorSubject<any>(null);
  readonly timeRange$ = this.timeInterval.asObservable();

  setPanelHeader(data: string) {
    this.tableHeader.next(data);
  }

  setTimeInterval(data: string) {
    this.timeInterval.next(data);
  }


}
