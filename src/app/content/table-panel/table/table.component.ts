import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import{ jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { DataService } from '../../../data/data-http.service';
import { Subject, takeUntil } from 'rxjs';
import { SummaryStockDataDto } from '../../../data/summary-stock-data.dto';
import { SelectionDataService } from '../../../data/selection-data.service';

export interface Row {
  [key: string]: any;
}



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [jqxGridModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, OnDestroy{

  private dataService = inject(DataService);
  private selectionDataService = inject(SelectionDataService);
  private destroy$ = new Subject<void>();
  private tickerDescription: any;

  dataAdapter: any;
  dataSets = new Array();

  ngOnInit(): void {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: SummaryStockDataDto) => {
        // console.log(data);

        for (let i = 0; i < data.chart.result[0].timestamp.length; i++) {
          let row: Row = {};
          row['Date'] = new Date(data.chart.result[0].timestamp[i] * 1000).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
          row['OpenPrice'] = data.chart.result[0].indicators.quote[0].open[i];
          row['ClosePrice'] = data.chart.result[0].indicators.quote[0].close[i];
          row['LowPrice'] = data.chart.result[0].indicators.quote[0].low[i];
          row['HighPrice'] = data.chart.result[0].indicators.quote[0].high[i];
          row['Volume'] = data.chart.result[0].indicators.quote[0].volume[i];

          this.dataSets[i] = row;
        }
        // console.log(this.dataSets);
        this.dataAdapter = new jqx.dataAdapter(this.source);
        const panelHeader = data.chart.result[0].meta.symbol + ', ' + data.chart.result[0].meta.longName
        this.selectionDataService.setPanelHeader(panelHeader);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  source = {
    localdata: this.dataSets,
    datatype: 'array',
    datafields: [
     { name: 'Date', type: 'string'},
     { name: 'OpenPrice', type: 'float'},
     { name: 'ClosePrice', type: 'float'},
     { name: 'LowPrice', type: 'float'},
     { name: 'HighPrice', type: 'float'},
     { name: 'Volume', type: 'float'},
    ]
  };

    cellsrenderer = (row: number, columnfield: string, value: number, defaulthtml: string, columnproperties: any, rowdata: any): string => {
        if (value < 20) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
        }
    };

    columngroups: any[] =
    [
        { text: 'Stock Information', align: 'center', name: 'stockInfo' }
    ];

    columns: any[] =
    [
        { text: 'Date', columngroup: 'stockInfo', datafield: 'Date', width: 200 },
        { text: 'Open', columngroup: 'stockInfo' ,datafield: 'OpenPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
        { text: 'Close', datafield: 'ClosePrice', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
        { text: 'Low', datafield: 'LowPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
        { text: 'High', datafield: 'HighPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
        { text: 'Volume', datafield: 'Volume', align: 'right', cellsalign: 'right', cellsformat: 'd' },
    ];

}
