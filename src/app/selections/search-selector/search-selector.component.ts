import { Component } from '@angular/core';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

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
    MatButtonModule
  ],
  templateUrl: './search-selector.component.html',
  styleUrl: './search-selector.component.css',
})
export class SearchSelectorComponent {
  value: String = '';

  stocks: StockModel[] = [
    { shortDesc: 'year-0', longDesc: 'Year' },
    { shortDesc: 'qtr-1', longDesc: 'Quarter' },
    { shortDesc: 'month-2', longDesc: 'Month' },
    { shortDesc: 'week-3', longDesc: 'Week' },
    { shortDesc: 'day-4', longDesc: 'Day' },
  ];

  selectedTimeFrame = this.stocks[0].shortDesc;
}
