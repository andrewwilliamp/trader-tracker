import { Component } from '@angular/core';
import { ChartPanelComponent } from "./chart-panel/chart-panel.component";
import { TablePanelComponent } from "./table-panel/table-panel.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ChartPanelComponent, TablePanelComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
