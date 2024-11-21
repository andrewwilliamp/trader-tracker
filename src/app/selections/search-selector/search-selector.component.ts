import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay';
import { SelectionDataService } from '../../data/selection-data.service';
import { PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { nasdaqTickers } from '../../data/nasdaq_full_tickers';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

interface StockModel {
  shortDesc: string;
  longDesc: string;
}

@Component({
  selector: 'app-search-selector',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatSuffix,
    MatListModule,
    MatButtonModule,
    OverlayModule,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './search-selector.component.html',
  styleUrl: './search-selector.component.css',
})
export class SearchSelectorComponent implements OnInit {
  private selectionDataService = inject(SelectionDataService);
  overlayOpen = this.selectionDataService.overlayOpen;
  recentSearches = this.selectionDataService.recentSearches as WritableSignal<string[]>;
  shortRecentSearches = this.selectionDataService.recentSearches().filter(x => x !== "").slice(0, 5);
  searchTerm = this.selectionDataService.searchTerm;
  pageEvent!: PageEvent;

  searchInputValue: string = '';

  TICKERS_DATA: any[] = nasdaqTickers;
  tickers = new MatTableDataSource(this.TICKERS_DATA)
  paginatedItems: any[] = [];

  ngOnInit(): void {
    this.updateTable();
  }

  filterTickers(filterValue: string) {
    this.tickers.filter = filterValue.trim().toUpperCase();
    this.TICKERS_DATA = this.tickers.filteredData;
    this.updateTable();
  }

  updateTable() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    let row: any = [];
    for (let i = 0; i < this.TICKERS_DATA.length; i++) {
      row.push({symbol: this.TICKERS_DATA[i].symbol, name: this.TICKERS_DATA[i].name});
    }
    this.paginatedItems = row.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateTable();
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectedItems = event.source.selectedOptions.selected.map(option => option.value);
    this.search(this.selectedItems.toString());
  }


  pageSizeOptions = [5, 10, 15];
  pageSize = 10;
  pageIndex = 0;
  selectedItems: any[] = []

  stocks: StockModel[] = [
    { shortDesc: 'year-0', longDesc: 'Year' },
    { shortDesc: 'qtr-1', longDesc: 'Quarter' },
    { shortDesc: 'month-2', longDesc: 'Month' },
    { shortDesc: 'week-3', longDesc: 'Week' },
    { shortDesc: 'day-4', longDesc: 'Day' },
  ];

  selectedTimeFrame = this.stocks[0].shortDesc;

  search(searchTerm: string) {
    if (!searchTerm) return;
    const upperCaseTerm = searchTerm.toUpperCase();
    let searchTermFound = false;
    for (let i = 0; i < this.TICKERS_DATA.length; i++) {
      if(this.TICKERS_DATA[i].symbol === upperCaseTerm) {
        searchTermFound = true;
        this.searchTerm.set(searchTerm);
        this.overlayOpen.set(false);
        this.selectionDataService.setTimeSelections('searchTerm', searchTerm)
        // add additional functionality here for dynamic results list
        this.addToRecentSearches(searchTerm);
        this.updateRecentSearches();
        break;
      }
    }
    if (!searchTermFound) {
      alert('please enter a valid stock ticker');
    }
  }

  addToRecentSearches(searchTerm: string) {
    this.recentSearches.set([
      searchTerm,
      ...this.recentSearches()
        .filter((terms: string) => terms !== searchTerm)
        .slice(0, 5),
    ]);
  }

  updateRecentSearches() {
    this.shortRecentSearches = this.selectionDataService
      .recentSearches().filter(x => x !== "")
      .slice(0, 5);
  }

}
