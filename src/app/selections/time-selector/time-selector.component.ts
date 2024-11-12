import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SelectionDataService } from '../../data/selection-data.service';

interface TimeModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-time-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  providers: [],
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.css'
})
export class TimeSelectorComponent {

  private selectionDataService = inject(SelectionDataService);
  timeIntervals: TimeModel[];
  timeRanges: TimeModel[];

  constructor() {

    this.timeIntervals = [
      // {value: '1m', viewValue: '1 Month'},
      {value: '1wk', viewValue: '1 Week'},
      {value: '1d', viewValue: '1 Day'},
    ];

    this.timeRanges = [
      {value: '5y', viewValue: '5 Years'},
      {value: '2y', viewValue: '2 Years'},
      {value: '1y', viewValue: '1 Years'},
      {value: 'ytd', viewValue: 'Year To Date'},
      {value: '6mo', viewValue: '6 Months'},
      {value: '3mo', viewValue: '3 Months'},
      {value: '1mo', viewValue: '1 Month'},
      {value: '5d', viewValue: '5 Days'},
    ];

  }

  updateTimeSelections(timeSelectionEvent: MatSelectChange) {
    const originElement = timeSelectionEvent.source.ariaLabel;
    this.selectionDataService.setTimeSelections(originElement, timeSelectionEvent.value);
  }


}

