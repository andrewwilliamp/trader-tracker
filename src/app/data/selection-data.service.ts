import { BehaviorSubject } from "rxjs";


export class SelectionDataService {

  private tableHeader = new BehaviorSubject<any>(null);
  tableHeader$ = this.tableHeader.asObservable();

  // constructor() {
  //   this.tableHeader = new BehaviorSubject<string>();
  // }
  setPanelHeader(data: any) {
    this.tableHeader.next(data);
  }

  // getPanelHeader() {
  //   this.tableHeader$.subscribe(data => console.log(data));
  // }


}
