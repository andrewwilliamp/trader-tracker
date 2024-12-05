export interface SummaryStockDataDto {
  chart: {
    result: {
      0: {
        meta: {
          currency: string | null;
          symbol: string | null;
          exchangeName: string | null;
          fullExchangeName: string | null;
          instrumentType: string | null;
          firstTradeDate: number | null;
          regularMarketTime: number | null;
          hasPrePostMarketData:true
          gmtoffset: number | null;
          timezone: string | null;
          exchangeTimezoneName: string | null;
          regularMarketPrice: number | null;
          fiftyTwoWeekHigh: number | null;
          fiftyTwoWeekLow: number | null;
          regularMarketDayHigh: number | null;
          regularMarketDayLow: number | null;
          regularMarketVolume: number | null;
          longName: string | null;
          shortName: string | null;
          chartPreviousClose: number | null;
          priceHint: number | null;
        },
        timestamp: [],
        indicators: {
          quote: {
            0: {
              volume: [],
              high: [],
              low: [],
              open: [],
              close: []
            }
          },
          adjclose: []
        }
      }
    },
    error: string | null;
  }
}
