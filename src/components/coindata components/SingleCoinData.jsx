import React, { useEffect, useState } from 'react';
import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext';
import { useCoin } from '../../cutom components and hooks/CoinContext';
import CoinChart from './CoinPriceChart';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import CoinMarketChart from './CoinMarketChart';
import MarketDataComponent from './MarketDataComponent';
import CoinHistoricalComponent from './CoinHistoricalComponent';
import ReadMoreReadLess from '../../cutom components and hooks/ReadMoreReadLess';
import { LuCandlestickChart } from "react-icons/lu";
import { BsGraphUp } from "react-icons/bs";
import CoinCandleChart from './CoinCandleChart';


function SingleCoinData() {
    const { coinData, setTime, setPriceChange } = UseSingleCoin();
    const { currency } = useCoin();
    const [selectedTime, setSelectedTime] = useState('24 Hrs');
    const [selectedChart, setSelectedChart] = useState('Price')
    const [graphType, setGraphType] = useState('line')
    const [priecMarketDis, setPriceMarketDis] = useState(false)
    const [candletrue, setCandleTrue] = useState(false);

    const coinSymbol = coinData?.symbol?.toUpperCase();
    const text = coinData?.description?.en || 'N/A';

    const icons = [
        { icon: <BsGraphUp />, value: 'line' },
        { icon: <LuCandlestickChart />, value: 'candlestick' }
    ];



    useEffect(() => {
        //console.log(coinData);
    }, [coinData]);

    function formatNumberWithCommas(number) {
        if (number == null) {
            return '0';
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handlegraphType = (type) => {
        setGraphType(type)
        if (type == 'candlestick') {
            setPriceMarketDis(true)
            setCandleTrue(true)
        } else {
            setPriceMarketDis(false);
            setCandleTrue(false)
        }
    }

    const handleButtonClick = (time) => {
        setSelectedTime(time);
        switch (time) {
            case "24 Hrs":
                setTime('1');
                setPriceChange('24h');
                break;
            case "7 Days":
                setTime('7');
                setPriceChange('7d');
                break;
            case "3 Months":
                setTime('90');
                setPriceChange('90d');
                break;
            case "1 Year":
                setTime('365');
                setPriceChange('1y');
                break;
            default:
                setTime('1');
                setPriceChange('24h');
                break;
        }
    };

    const handleChartSelect = (item) => {
        setSelectedChart(item)
    }

    return (
        <div className='coin-full-data'>
            <span className='Coin-Image'>
                <img src={coinData && coinData.image ? coinData.image.large : ''} alt='im' width={40} height={40} />
                <div style={{ lineHeight: '5px', paddingTop: '9px' }}>
                    <p style={{ fontWeight: 'bold' }}>{coinData && coinData.name}/{currency.name}</p>
                    <p>{coinData && coinData.id}</p>
                </div>
                <div style={{ backgroundColor: 'rgb(241, 245, 249)', padding: '4px', borderRadius: '5px' }}>
                    #{coinData && coinData.market_cap_rank}
                </div>
            </span>
            <div className='price' style={{ padding: '7px 10px 0px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h3 style={{ fontWeight: 'bolder' }}>{currency.symbol}{coinData && coinData.market_data && coinData.market_data.current_price && coinData.market_data.current_price[currency.value] ? formatNumberWithCommas(coinData.market_data.current_price[currency.value]) : '-'}</h3>
                {coinData && coinData.market_data && coinData.market_data.current_price &&
                    (coinData.market_data.price_change_percentage_24h > 0 ?
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px', color: 'rgb(0, 168, 62)', fontWeight: 'bolder' }}>
                            <ArrowDropUpOutlinedIcon />
                            <span style={{ marginLeft: '3px' }}>{coinData.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                        </div>
                        :
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px', color: 'rgb(255, 58, 51)', fontWeight: 'bolder' }}>
                            <ArrowDropDownOutlinedIcon />
                            <span style={{ marginLeft: '3px' }}>{coinData.market_data.price_change_percentage_24h.toFixed(2)} %</span>
                        </div>
                    )
                }
            </div>
            <div className='chart-time'>
                {['24 Hrs', '7 Days', '3 Months', '1 Year'].map((time) => (
                    <button  key={time} onClick={() => handleButtonClick(time)}
                        className={selectedTime === time ? 'selected-time' : 'unSelected-time'} >
                        {time}
                    </button>
                ))}
            </div>
            <div className='chart_type_PM'>
                <div className='chart-type' >
                    {['Price', 'Market Cap'].map((item) => (
                        <button disabled={priecMarketDis} onClick={() => handleChartSelect(item)} className={selectedChart === item && graphType !== 'candlestick' ? 'chart-selected' : 'chart-unselected'}>{item}</button>
                    ))}
                </div>
                <div className='chart-type chart_type_LC'>
                    {icons.map((item, index) => (
                        <button key={index} className={`chart_btn_LC ${graphType === item.value ? 'chart-selected' : 'chart-unselected'}`}
                            onClick={() => handlegraphType(item.value)}
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {candletrue ? 
                <CoinCandleChart /> : 
                (<div className='chart' style={{ margin: '15px 0px 10px 0px' }}>
                    {selectedChart === 'Price' ? <CoinChart /> : <CoinMarketChart />}
                </div>)}
            </div>

            <div className='market-data data' >
                <h6>Market Data</h6>
                <MarketDataComponent />
            </div>
            <div className='Historical-data data' >
                <h6>{coinSymbol} Historical Price</h6>
                <CoinHistoricalComponent />
            </div>
            <div className='description'>
                <h6>Info</h6>
                <ReadMoreReadLess text={text} maxLength={100} />

            </div>

        </div>
    );
}

export default SingleCoinData;
