import _ from 'lodash';

const yahooFinance = require('yahoo-finance');

// Function to get the current share price
function getCurrentSharePrice(tickerSymbol) {
  return new Promise((resolve, reject) => {
    yahooFinance.quote({
      symbol: tickerSymbol,
      modules: ['price']
    }, (err, quotes) => {
      if (err) {
        reject(err);
      } else {
        const price = quotes.price.regularMarketPrice;
        resolve(Math.round(price)); // Convert to integer format
      }
    });
  });
}

// Function to get the shares outstanding
function getSharesOutstanding(tickerSymbol) {
  return new Promise((resolve, reject) => {
    yahooFinance.quote({
      symbol: tickerSymbol,
      modules: ['defaultKeyStatistics']
    }, (err, quotes) => {
      if (err) {
        reject(err);
      } else {
        const sharesOutstanding = quotes.defaultKeyStatistics.sharesOutstanding;
        resolve(sharesOutstanding); // Return as integer
      }
    });
  });
}

// Example usage
const tickerSymbol = 'ZIM';
