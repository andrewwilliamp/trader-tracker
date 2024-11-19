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

  value: String = '';

  tickers: any[] = nasdaqTickers;
  paginatedItems: any[] | undefined;

  ngOnInit(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedItems = this.tickers.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectedItems = event.source.selectedOptions.selected.map(option => option.value);
  }


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
    this.searchTerm.set(searchTerm);
    this.overlayOpen.set(false);
    this.selectionDataService.setTimeSelections('searchTerm', searchTerm)
    // add additional functionality
    this.addToRecentSearches(searchTerm);
    this.updateRecentSearches();
  }

  addToRecentSearches(searchTerm: string) {
    const upperCaseTerm = searchTerm.toUpperCase();
    this.recentSearches.set([
      upperCaseTerm,
      ...this.recentSearches()
        .filter((terms: string) => terms !== upperCaseTerm)
        .slice(0, 5),
    ]);
  }

  updateRecentSearches() {
    this.shortRecentSearches = this.selectionDataService
      .recentSearches().filter(x => x !== "")
      .slice(0, 5);
  }


  performSearch(searchTerm: string) {
    this.search(searchTerm);
  }
}
