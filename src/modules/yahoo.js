// Everything in this API will return Promise so remember to use await

// getHistoricalPrices: async function(startDate, endDate, symbol, frequency)

// startDate: Object (datetime)
// endDate: Object (datetime)
// symbol: String (stock symbol)
// frequency: String ('1d', '1wk' or '1mo' only)
// 1d: 1day
// 1wk: 1 week
// 1mo: 1 month
// Return promise, example:

/*
const yahooStockAPI  = require('yahoo-stock-api');
async function main()  {
  const startDate = new Date('08/21/2020');
  const endDate = new Date('08/26/2020');
  console.log(await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d'));
}
main();
*/

// =========================================================================

const yahooStockAPI = require('yahoo-stock-api');

async function main() {
  const startDate = new Date('01/01/2022');
  const endDate = new Date('07/31/2022'); // change this date range to be previous year from current date
  // function toDate(unix) {
  //   console.log(unix);
  //   return new Date((unix * 1000).toLocaleDateString());
  // }
  let results = await yahooStockAPI.getHistoricalPrices(startDate, endDate, '^GSPC', '1wk');
  let gspc = [];
  results.response.map(obj => {
    gspc.push({
      date: new Date((obj.date)*1000).toLocaleDateString(),
      close: obj.close,
    });
  });
  // gspc.forEach(dataPoint => {
  //   toDate(dataPoint.date);
  // });
  console.log(gspc);
  // console.log(new Date(1659153600*1000).toLocaleDateString());

}

main();