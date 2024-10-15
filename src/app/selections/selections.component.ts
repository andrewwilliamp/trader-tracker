import { Component } from '@angular/core';
import { TimeSelectorComponent } from "./time-selector/time-selector.component";
import { SearchSelectorComponent } from "./search-selector/search-selector.component";
import { ChartPanelComponent } from "../content/chart-panel/chart-panel.component";
import { TablePanelComponent } from "../content/table-panel/table-panel.component";

@Component({
  selector: 'app-selections',
  standalone: true,
  imports: [TimeSelectorComponent, SearchSelectorComponent, ChartPanelComponent, TablePanelComponent],
  templateUrl: './selections.component.html',
  styleUrl: './selections.component.css'
})
export class SelectionsComponent {

}
