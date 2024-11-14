import { effect, signal } from "@angular/core";
import { sign } from "crypto";
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

  overlayOpen = signal(false);
  recentSearches = signal<string[]>(JSON.parse(window.localStorage.getItem('recentSearches') ?? '["test"]'));
  searchTerm = signal<string>('');

  constructor() {
    this.selectionsArray = [{ "origin": 'timeInterval', "data": '1wk' }, { "origin": 'timeRange', "data": '5y' }];
    this.updateTimeData(this.selectionsArray);
  }

  updateTimeData(arrayData: Selections[]) {
    this.timeData.next(arrayData);
  }

  setPanelHeader(data: string) {
    this.tableHeader.next(data);
  }

  // replace existing selections with new
  setTimeSelections(origin: string, data: string) {
      this.selectionsArray = this.selectionsArray.filter(item => item.origin !== origin);
      this.selectionsArray.push({ "origin": origin, "data": data });
      this.timeData.next(this.selectionsArray);
      console.log(this.selectionsArray);
  }

  saveLocalStorage = effect(() => {
    window.localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches()));
  })

}
