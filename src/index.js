import _ from 'lodash';

const axios = require('axios');

// Function to get the current share price
async function getCurrentSharePrice(tickerSymbol) {
  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${tickerSymbol}`);
    const price = response.data.chart.result[0].meta.regularMarketPrice;
    return Math.round(price); // Convert to integer format
  } catch (error) {
    console.error('Error fetching stock price:', error);
    throw error;
  }
}

// Function to get the shares outstanding
async function getSharesOutstanding(tickerSymbol) {
  try {
    const response = await axios.get(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${tickerSymbol}?modules=defaultKeyStatistics`);
    const sharesOutstanding = response.data.quoteSummary.result[0].defaultKeyStatistics.sharesOutstanding.raw;
    return sharesOutstanding; // Return as integer
  } catch (error) {
    console.error('Error fetching shares outstanding:', error);
    throw error;
  }
}

// Example usage
const tickerSymbol = 'ZIM';

getCurrentSharePrice(tickerSymbol)
  .then(price => {
    console.log(`The current price of ${tickerSymbol} is $${price}`);
  })
  .catch(err => {
    console.error('Error fetching stock price:', err);
  });

getSharesOutstanding(tickerSymbol)
  .then(sharesOutstanding => {
    console.log(`The shares outstanding of ${tickerSymbol} are ${sharesOutstanding}`);
  })
  .catch(err => {
    console.error('Error fetching shares outstanding:', err);
  });

