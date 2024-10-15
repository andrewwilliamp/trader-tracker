import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chart-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule],
  templateUrl: './chart-panel.component.html',
  styleUrl: './chart-panel.component.css'
})
export class ChartPanelComponent {

}
