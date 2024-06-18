import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# Function to get historical stock data
def get_stock_data(ticker, days):
    start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    end_date = datetime.now().strftime('%Y-%m-%d')  
    stock = yf.Ticker(ticker)
    df = stock.history(start=start_date, end=end_date)
    
    # add the ticker symbol, current price, max and min price in a week and average as a column
    df['ticker'] = ticker
    df['current_price'] = df['Close'].iloc[-1]
    df['average'] = df['Close'].mean()
    df['max_price'] = df['Close'].max()
    df['min_price'] = df['Close'].min()
    df['timestamp'] = df.index

    # Add the full name of the company
    df['company_name'] = stock.info['longName']

    # Drop the columns that are not needed (open, high, low, dividends, stock splits)
    df = df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume', 'Dividends', 'Stock Splits'])

    # Only keep the last row
    summary_df = df.tail(1)
    return df, summary_df


# Get stock data for a specific ticker symbol
def get_stock_data_for_graph(ticker, days):
    start_date = (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
    end_date = datetime.now().strftime('%Y-%m-%d')  
    stock = yf.Ticker(ticker)
    df = stock.history(start=start_date, end=end_date)
    
    df['ticker'] = ticker
    df['current_price'] = df['Close']
    df['timestamp'] = df.index

    return df


# Define the ticker symbol and date range
# ticker = 'AAPL'  # Example: Apple Inc.


# Get the historical data
# df = get_stock_data(ticker, 7)
# print(df)