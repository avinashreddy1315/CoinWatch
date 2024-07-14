import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useCoin } from "./CoinContext";

const SingleCoinContext = createContext();

export const SingleCoinContextProvider = (props) => {
  const [coinId, setCoinId] = useState(null);
  const [coinDataLoading, setCoinDataLoading] = useState(false);
  const [coinData, setCoinData] = useState({});
  const [time, setTime] = useState('1');
  const [historicalData, setHistoricalData] = useState();
  const [marketHistoricalData, setMarketHistoricalData] = useState();
  const { currency } = useCoin();
  const [chartLoading, setChartLoading] = useState(false);
  const [priceChange, setPriceChange] = useState()
  const [fav, setfav] = useState([])
  const [candleChart, setCandleChart] = useState()
  const [candlechartLoading, setCandleChartLoading] = useState(false);

  const fetchCoinData = async (coinId) => {
    const options = {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-GLQ8rCZdg9eL6ZKn7VUUVbfC'
      }
    };
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

    try {
      setCoinDataLoading(true);
      const response = await axios.get(url, options);
      setCoinData(response.data);
      //console.log(response.data);
      setCoinDataLoading(false);
    } catch (err) {
      console.error(err);
      setCoinDataLoading(false);
    }
  };

  const fetchCoinChartData = async (coinId, currency, time) => {
    
    const options = {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-GLQ8rCZdg9eL6ZKn7VUUVbfC'
      }
    };
    try {
      
      setChartLoading(true);
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.value}&days=${time}`, options);
      setHistoricalData(response.data.prices);
      //console.log(response.data.prices);
      //console.log(response.data)
      setMarketHistoricalData(response.data.market_caps)
      //console.log(response.data.market_caps)
      setChartLoading(false);
    } catch (err) {
      console.error(err);
      setChartLoading(false);
    }

    // Add your chart data fetching logic here
  }; 


  const fetchCoinCandleChartData = async (coinId, currency, time) => {
    
    const options = {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-GLQ8rCZdg9eL6ZKn7VUUVbfC'
      }
    };
    try {
      
      setCandleChartLoading(true);
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=${currency.value}&days=${time}`, options);
      setCandleChart(response.data);
      console.log(response.data);
      //console.log(response.data.market_caps)
      setCandleChartLoading(false);
    } catch (err) {
      console.error(err);
      setCandleChartLoading(false);
    }

    // Add your chart data fetching logic here
  }; 

  useEffect(() => {
    if (coinId) {
      fetchCoinData(coinId);
    }
  }, [coinId]);

  useEffect(() => {
    setChartLoading(true);
    setCandleChartLoading(true);
    const chart = setTimeout(()=>{
      fetchCoinChartData(coinId ? coinId : coinData.id, currency, time);
      fetchCoinCandleChartData(coinId ? coinId : coinData.id, currency, time)
    }, 5000)


    return () =>{
      clearTimeout(chart);
    }
    
    //console.log(coinId)
  }, [coinId, currency, time]);

  const contextValue = { setCoinId, coinData, coinDataLoading,  setTime, historicalData,  chartLoading, time, setPriceChange, priceChange, marketHistoricalData, fav, setfav, candleChart, candlechartLoading};

  return (
    <SingleCoinContext.Provider value={contextValue}>
      {props.children}
    </SingleCoinContext.Provider>
  );
};

export const UseSingleCoin = () => useContext(SingleCoinContext);

