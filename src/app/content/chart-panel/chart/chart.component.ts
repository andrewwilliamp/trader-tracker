import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { DataService } from '../../../data/data-http.service';
import { Subject, takeUntil } from 'rxjs';
import { SelectionDataService } from '../../../data/selection-data.service';
import { SummaryStockDataDto } from '../../../data/summary-stock-data.dto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, jqxChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit {
  private dataService = inject(DataService);
  private selectionDataService = inject(SelectionDataService);
  private destroy$ = new Subject<void>();
  dataAdapter: any;
  dataSets = new Array();

  // dynamically changes based on user selection of timePeriod to view stock data
  @Input() timePeriod: string = 'month';

  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // source: any =
  // {
  //     datatype: "json",
  //     datafields: [
  //         { name: 'Date' },
  //         { name: 'NASDAQ' }
  //     ]
  // };

  sampleData: any[] = [
    { Date: '01-Jan-2014', NASDAQ: 200 },
    { Date: '02-Feb-2014', NASDAQ: 220 },
    { Date: '03-Mar-2014', NASDAQ: 240 },
    { Date: '04-Apr-2014', NASDAQ: 360 },
    { Date: '05-May-2014', NASDAQ: 280 },
  ];

  ngOnInit(): void {
    this.updateChartData();
  }

  updateChartData = () => {
    const source = {
      localdata: this.dataSets,
      datatype: 'array',
      datafields: [
        { name: 'Date', type: 'date', format: 'MM/dd/yyyy' },
        { name: 'ClosePrice', type: 'float' },
      ],
    };

    this.selectionDataService.timeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((timeData: any[]) => {
        console.log('time: ', timeData);
        const timeInterval = timeData.find(
          (value) => value.origin === 'timeInterval'
        ).data;
        const timeRange = timeData.find(
          (value) => value.origin === 'timeRange'
        ).data;
        const ticker = timeData.find(
          (value) => value.origin === 'searchTerm'
        ).data;
        console.log('ticker ', ticker);
        this.dataService
          // FIXME
          .getData('1mo', '6mo', ticker)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data: SummaryStockDataDto) => {
              console.log(data);
              for (let i = 0; i < data.chart.result[0].timestamp.length; i++) {
                let row: any = {};
                row['Date'] = new Date(
                  data.chart.result[0].timestamp[i] * 1000
                ).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                });
                row['ClosePrice'] =
                  data.chart.result[0].indicators.quote[0].close[i];
                this.dataSets[i] = row;
              }
              console.log(this.dataSets);
              source.localdata = this.dataSets;
              this.dataAdapter = new jqx.dataAdapter(source);

              const panelHeader =
                data.chart.result[0].meta.symbol +
                ', ' +
                data.chart.result[0].meta.longName;
              this.selectionDataService.setPanelHeader(panelHeader);
              this.dataSets = [];
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      });
  };

  // dataAdapter: any = new jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source.url + '" : ' + error); } });

  padding: any = { left: 10, top: 5, right: 10, bottom: 5 };

  titlePadding: any = { left: 50, top: 0, right: 0, bottom: 10 };

  xAxis: any = {
    dataField: 'Date',
    type: 'date',
  };
  //
  // baseUnit: this.timePeriod,
  // valuesOnTicks: true,
  // minValue: '08-08-2024',
  // maxValue: '11-11-2024',
  // tickMarks: {
  //     visible: true,
  //     interval: 1,
  //     color: '#BCBCBC'
  // },
  // unitInterval: 1,
  // gridLines: {
  //     visible: true,
  //     interval: 3,
  //     color: '#BCBCBC'
  // },
  // labels: {
  //     angle: -45,
  //     rotationPoint: 'topright',
  //     offset: { x: 0, y: -25 }
  // }
  // };

  valueAxis: any = {
    visible: true,
    title: { text: 'Daily Closing Price<br>' },
    tickMarks: { color: '#BCBCBC' },
    minValue: 0,
    maxValue: 2.0,
  };

  seriesGroups: any = [
    {
      type: 'line',
      series: [{ dataField: 'ClosePrice', displayText: 'AMRN' }],
      valueAxis: {
        unitInterval: .1,
        minValue: 0,
        maxValue: 2,
        displayValueAxis: true,
        description: 'Time in minutes',
        axisSize: 'auto',
        tickMarksColor: '#888888',
      },
    },
  ];
}
