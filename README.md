 CoinWatch

CoinWatch is a Google Chrome extension that allows users to keep track of cryptocurrency prices and manage their favorite coins. The extension offers various features including user authentication, real-time data retrieval from Firestore, and detailed coin information with historical data visualization.

## Features

- **User Authentication**: Secure login functionality with data storage in Firebase.
- **Real-Time Coin Prices**: Fetches and displays the latest prices of cryptocurrencies using the CoinGecko API.
- **Favorite List**: Users can add or remove coins from their favorite list.
- **Currency Conversion**: Ability to change the displayed currency for coin prices.
- **Filtering and Search**: Users can apply filters and search for specific coins.
- **Historical Data Visualization**: Displays historical price data using line and candlestick graphs.
- **Detailed Coin Information**: Provides previous details and historical data of each coin.

## Technologies Used

- **React**: For building the user interface.
- **JavaScript**: Core programming language for the project.
- **Material-UI**: For styling and icons.
- **ApexCharts**: For graphical representation of historical data.
- **Firebase**: For user authentication and data storage.
- **Firestore**: For real-time data retrieval and storage.
- **CoinGecko API**: For providing real-time data on coin prices.

## Installation

To install and run the CoinWatch extension locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/avinashreddy1315/CoinWatch.git
   ```

2. Navigate to the project directory:

   ```sh
   cd CoinWatch
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Build the project:

   ```sh
   npm run build
   ```

5. Load the extension in Google Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build` directory

## Usage

- After installing the extension, click on the CryptoWatch icon in the Chrome toolbar to open the extension.
- Log in with your credentials to access the features.
- Use the search bar to find specific coins, apply filters to narrow down results, and add coins to your favorite list.
- Change the displayed currency from the settings menu.
- View detailed coin information and historical price data in various graphical formats.




CryptoWatch is a Chrome extension for tracking cryptocurrency prices and managing favorites. It includes real-time data from CoinGecko API, user authentication, and powerful historical data visualization features.
