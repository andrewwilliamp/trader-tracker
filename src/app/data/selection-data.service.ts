import { BehaviorSubject } from "rxjs";

interface Selections {
  origin: string,
  data: string
}

export class SelectionDataService {

  selectionsArray!: Selections[];

  private tableHeader = new BehaviorSubject<any>(null);
  readonly tableHeader$ = this.tableHeader.asObservable();

  private timeData = new BehaviorSubject<any>(null);
  readonly timeData$ = this.timeData.asObservable();

  constructor() {
    this.selectionsArray = [{ "origin": 'timeInterval', "data": '1wk' }, { "origin": 'timeRange', "data": '5y' }];
    this.timeData.next(this.selectionsArray);
  }

  setPanelHeader(data: string) {
    this.tableHeader.next(data);
  }

  // replace existing
  setTimeSelections(origin: string, data: string) {
      this.selectionsArray = this.selectionsArray.filter(item => item.origin !== origin);
      this.selectionsArray.push({ "origin": origin, "data": data });
      this.timeData.next(this.selectionsArray);
      console.log(this.selectionsArray);
  }

}
