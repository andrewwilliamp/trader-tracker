import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-chart-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule, ChartComponent],
  templateUrl: './chart-panel.component.html',
  styleUrl: './chart-panel.component.css'
})
export class ChartPanelComponent {

}
