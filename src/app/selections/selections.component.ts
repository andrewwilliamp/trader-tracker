import { Component, inject, OnInit, signal } from '@angular/core';
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { SearchSelectorComponent } from './search-selector/search-selector.component';
import { ChartPanelComponent } from '../content/chart-panel/chart-panel.component';
import { TablePanelComponent } from '../content/table-panel/table-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SelectionDataService } from '../data/selection-data.service';

@Component({
  selector: 'app-selections',
  standalone: true,
  imports: [
    TimeSelectorComponent,
    SearchSelectorComponent,
    ChartPanelComponent,
    TablePanelComponent,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  providers: [],
  templateUrl: './selections.component.html',
  styleUrl: './selections.component.css',
})
export class SelectionsComponent{
  selectionDataService = inject(SelectionDataService);
  selectionPaneHidden = this.selectionDataService.selectionsPaneHidden;


}
