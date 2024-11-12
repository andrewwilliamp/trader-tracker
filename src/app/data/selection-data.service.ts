import { OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface Selections {
  origin: string,
  data: string
}

export class SelectionDataService {

  selectionsArray!: Selections[];

  constructor() {
    this.selectionsArray = [{ "origin": 'timeInterval', "data": '1wk' }, { "origin": 'timeRange', "data": '5y' }];
    this,this.timeData.next(this.selectionsArray);
    this.timeData$ = this.timeData.asObservable();
  }

  private tableHeader = new BehaviorSubject<any>(null);
  readonly tableHeader$ = this.tableHeader.asObservable();

  private timeData = new BehaviorSubject<any>(null);
  readonly timeData$;



  setPanelHeader(data: string) {
    this.tableHeader.next(data);
  }

  // now every time there is a duplicate origin, we need to keep the new and remove the old
  setTimeInterval(origin: string, data: string) {

      this.selectionsArray = this.selectionsArray.filter(item => item.origin !== origin);
      this.selectionsArray.push({ "origin": origin, "data": data });



      this.timeData.next(this.selectionsArray);
      console.log(this.selectionsArray);

  }


}
