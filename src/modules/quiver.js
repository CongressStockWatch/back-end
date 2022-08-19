const axios = require('axios');
require('dotenv').config();
let token = process.env.QUIVER_API_KEY;
axios.defaults.headers.common['Authorization'] = `${token}`;

async function getCongressTradingInfo(req, res, next) {
  try {
    const results = await axios.get('https://api.quiverquant.com/beta/live/congresstrading');
    let congressTrades = results.data;
    let repNames = [];
    congressTrades.forEach(trade => {
      if (!(repNames.includes(trade.Representative))) {
        repNames.push(trade.Representative);
      }
    });
    let repsTrades = repNames.map(name => {
      return {representative: name, house: '', trades: []};
    });
    congressTrades.forEach(trade => {
      repsTrades.forEach(obj => {
        if (trade.Representative === obj.representative) {
          obj.house = trade.House;
          obj.trades.push({
            transactionDate: trade.TransactionDate,
            ticker: trade.Ticker,
            transaction: trade.Transaction,
            amount: trade.Amount,
            range: trade.Range,
          });
        }
      });
    });
    const tradeDates = [];
    repsTrades.forEach(rep => {
      rep.trades.forEach(trade => {
        if(!(tradeDates.includes(trade.transactionDate))) {
          tradeDates.push(trade.transactionDate);
        }
      });
    });
    let tradesOnDate = tradeDates.map(date => {
      return {date: date, numberOfBuys: 0, numberOfSells: 0, netTrades: 0};
    });
    repsTrades.forEach(rep => {
      rep.trades.forEach(trade => {
        tradesOnDate.forEach(date => {
          if (date.date === trade.transactionDate && trade.transaction === 'Purchase') {
            date.numberOfBuys = date.numberOfBuys + 1;
            date.netTrades = date.netTrades + 1;
          } else if (date.date === trade.transactionDate && trade.transaction === 'Sale') {
            date.numberOfSells = date.numberOfSells + 1;
            date.netTrades = date.netTrades - 1;
          }
        });
      });
    });
    console.log(tradesOnDate);
    res.status(200).send({repsTrades, tradesOnDate, congressTrades});
  } catch (e) {
    console.error(e);
    next(e);
  }
}

module.exports = getCongressTradingInfo;