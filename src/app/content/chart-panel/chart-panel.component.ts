import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from './chart/chart.component';
import { Subject, takeUntil } from 'rxjs';
import { SelectionDataService } from '../../data/selection-data.service';

@Component({
  selector: 'app-chart-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule, ChartComponent],
  templateUrl: './chart-panel.component.html',
  styleUrl: './chart-panel.component.css'
})
export class ChartPanelComponent {
  private destroy$ = new Subject<void>();
  private selectionDataService: SelectionDataService = inject(SelectionDataService);
  panelHeader: any;
  selectedValue: any;

  ngOnInit() {
    this.selectionDataService.tableHeader$.pipe(takeUntil(this.destroy$)).subscribe(data => this.panelHeader = data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
