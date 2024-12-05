import { effect, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Selections {
  origin: string;
  data: string;
}

export class SelectionDataService {
  selectionsArray!: Selections[];

  private tableHeader = new BehaviorSubject<any>(null);
  readonly tableHeader$ = this.tableHeader.asObservable();

  private timeData = new BehaviorSubject<any>(null);
  readonly timeData$ = this.timeData.asObservable();
  recentSearches = signal(['']);

  overlayOpen = signal(false);
  searchTerm = signal<string>('');
  selectionsPaneHidden = signal(false);

  constructor() {
    this.selectionsArray = [
      { origin: 'timeInterval', data: '1wk' },
      { origin: 'timeRange', data: '5y' },
      { origin: 'searchTerm', data: 'AMRN' },
    ];
    this.updateTimeData(this.selectionsArray);
    // page will not load if local storage is empty, initialize here
    if (!localStorage.getItem('recentSearches')) {
      this.recentSearches.set(['']);
    } else {
      this.recentSearches = signal(
        JSON.parse(window.localStorage.getItem('recentSearches') ?? '[]')
      );
    }
  }

  toggleSidebar() {
    this.selectionsPaneHidden.set(!this.selectionsPaneHidden());
  }

  updateTimeData(arrayData: Selections[]) {
    this.timeData.next(arrayData);
  }

  setPanelHeader(data: string) {
    this.tableHeader.next(data);
  }

  // replace existing selections with new
  setTimeSelections(origin: string, data: string) {
    this.selectionsArray = this.selectionsArray.filter(
      (item) => item.origin !== origin
    );
    this.selectionsArray.push({ origin: origin, data: data });
    this.timeData.next(this.selectionsArray);
  }

  saveLocalStorage = effect(() => {
    window.localStorage.setItem(
      'recentSearches',
      JSON.stringify(this.recentSearches())
    );
  });
}
