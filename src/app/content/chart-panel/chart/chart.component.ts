import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, jqxChartModule ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {

  // dynamically changes based on user selection of timePeriod to view stock data
  @Input() timePeriod: string = 'month';


  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  source: any =
  {
      datatype: "json",
      datafields: [
          { name: 'Date' },
          { name: 'S&P-500' },
          { name: 'NASDAQ' }
      ]
  };

  sampleData: any[] = [
    { Date: "01-Jan-2014", 'S&P-500': 100, NASDAQ: 200   },
    { Date: "02-Feb-2014", 'S&P-500': 120, NASDAQ: 220   },
    { Date: "03-Mar-2014", 'S&P-500': 140, NASDAQ: 240   },
    { Date: "04-Apr-2014", 'S&P-500': 160, NASDAQ: 360   },
    { Date: "05-May-2014", 'S&P-500': 180, NASDAQ: 280   },
  ]

  // dataAdapter: any = new jqx.dataAdapter(this.source, { async: false, autoBind: true, loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + this.source.url + '" : ' + error); } });


  padding: any = { left: 10, top: 5, right: 10, bottom: 5 };

  titlePadding: any = { left: 50, top: 0, right: 0, bottom: 10 };

  xAxis: any =
  {
      dataField: 'Date',
      formatFunction: (value: any) => {
          return value.getDate() + '-' + this. months[value.getMonth()] + '-' + value.getFullYear();
      },
      type: 'date',
      baseUnit: this.timePeriod,
      valuesOnTicks: true,
      minValue: '01-01-2014',
      maxValue: '01-01-2015',
      tickMarks: {
          visible: true,
          interval: 1,
          color: '#BCBCBC'
      },
      unitInterval: 1,
      gridLines: {
          visible: true,
          interval: 3,
          color: '#BCBCBC'
      },
      labels: {
          angle: -45,
          rotationPoint: 'topright',
          offset: { x: 0, y: -25 }
      }
  };

  valueAxis: any =
  {
      visible: true,
      title: { text: 'Daily Closing Price<br>' },
      tickMarks: { color: '#BCBCBC' },
      minValue: 0,
      maxValue: 500
  };

  seriesGroups: any =
  [
      {
          type: 'line',
          series: [
              { dataField: 'S&P-500', displayText: 'S&P 500' },
              { dataField: 'NASDAQ', displayText: 'NASDAQ' }
          ]
      }
  ];
}
