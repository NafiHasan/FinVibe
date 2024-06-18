from pycoingecko import CoinGeckoAPI
import pandas as pd
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import matplotlib

matplotlib.use('Agg')
# Use an interactive backend
plt.switch_backend('TkAgg')

# Initialize the CoinGecko API client
cg = CoinGeckoAPI()

# def get_historical_data(coin_id, vs_currency, days):
#     # Fetch historical market data (last `days` days)
#     data = cg.get_coin_market_chart_by_id(id=coin_id, vs_currency=vs_currency, days=days)
#     prices = data['prices']
#     df = pd.DataFrame(prices, columns=['timestamp', 'price'])
#     df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
#     return df

def get_data(coin_id, vs_currency, days):
    data = cg.get_coin_market_chart_by_id(id=coin_id, vs_currency=vs_currency, days=days, interval='daily')
    prices = data['prices']
    df = pd.DataFrame(prices, columns=['timestamp', 'price'])
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    return df
