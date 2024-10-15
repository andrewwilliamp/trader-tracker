import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


interface TimeFrameModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-time-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.css'
})
export class TimeSelectorComponent {

  timeFrames: TimeFrameModel[] = [
    {value: 'year-0', viewValue: 'Year'},
    {value: 'qtr-1', viewValue: 'Quarter'},
    {value: 'month-2', viewValue: 'Month'},
    {value: 'week-3', viewValue: 'Week'},
    {value: 'day-4', viewValue: 'Day'},
  ];

  selectedTimeFrame = this.timeFrames[0].value;

}

