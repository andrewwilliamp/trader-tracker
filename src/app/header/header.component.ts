import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { SelectionDataService } from '../data/selection-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatButtonToggle],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  selectionDataService = inject(SelectionDataService);


  toggleSidebar() {
    this.selectionDataService.toggleSidebar()
  }
}
