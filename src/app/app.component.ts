import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SelectionsComponent } from './selections/selections.component';
import { ChartPanelComponent } from './content/chart-panel/chart-panel.component';
import { TablePanelComponent } from './content/table-panel/table-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SelectionsComponent,
    ChartPanelComponent,
    TablePanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'trader-tracker';
}
