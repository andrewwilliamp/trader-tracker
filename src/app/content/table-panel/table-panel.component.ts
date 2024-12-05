import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table/table.component';
import { SelectionDataService } from '../../data/selection-data.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-table-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatFormFieldModule, TableComponent],
  providers: [],
  templateUrl: './table-panel.component.html',
  styleUrl: './table-panel.component.css'
})

export class TablePanelComponent implements OnInit, OnDestroy {

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
