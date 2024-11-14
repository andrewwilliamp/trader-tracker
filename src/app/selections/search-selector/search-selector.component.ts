import { Component, computed, inject } from '@angular/core';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { OverlayModule } from '@angular/cdk/overlay';
import { SelectionDataService } from '../../data/selection-data.service';

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
  ],
  templateUrl: './search-selector.component.html',
  styleUrl: './search-selector.component.css',
})
export class SearchSelectorComponent {
  private selectionDataService = inject(SelectionDataService);
  overlayOpen = this.selectionDataService.overlayOpen;
  recentSearches = this.selectionDataService.recentSearches;
  shortRecentSearches = this.selectionDataService.recentSearches().slice(0, 5);

  searchTerm = this.selectionDataService.searchTerm;

  value: String = '';

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
      .recentSearches()
      .slice(0, 5);
  }

  deleteRecentSearch(searchTerm: string) {
    this.recentSearches.set(
      this.recentSearches().filter((terms: string) => terms !== searchTerm)
    );
  }

  performSearch(searchTerm: string) {
    this.search(searchTerm);
  }
}
