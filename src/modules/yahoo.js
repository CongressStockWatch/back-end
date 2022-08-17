
const yahooStockAPI = require('yahoo-stock-api');

async function sp500(res) {
  const currentDate = new Date();
  const startDate = new Date((currentDate - 31557600000));
  const endDate = currentDate;
  // const key = 's&p-' +
  let results = await yahooStockAPI.getHistoricalPrices(startDate, endDate, '^GSPC', '1wk');
  // console.log('results: ', results);
  let gspc = results.response.map(obj => new GraphPlot(obj));
  // let gspc = results.response.map(obj => {
  //   return {
  //     date: new Date((obj.date) * 1000).toLocaleDateString(),
  //     close: obj.close,
  //   };
  // });
  return gspc;
}

class GraphPlot {
  constructor(dataPoint) {
    this.date = new Date((dataPoint.date) * 1000).toLocaleDateString();
    this.close = dataPoint.close;
  }
}

module.exports = sp500;