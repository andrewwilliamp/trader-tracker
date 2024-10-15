import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule],
  templateUrl: './table-panel.component.html',
  styleUrl: './table-panel.component.css'
})
export class TablePanelComponent {

}
