import React from 'react';
import Chart from 'react-apexcharts';

import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext';
import { CircularProgress } from '@mui/material';

function CoinCandleChart() {
    const { candleChart, chartLoading, candlechartLoading } = UseSingleCoin(); // Assuming candleChart and chartLoading are accessible via useSingleCoin context
    //nnn
    // Extracting data from candleChart
    const series = [{
        data: candleChart?.map(data => ({
            x: new Date(data[0]), // Timestamp for x-axis
            y: [data[1], data[2], data[3], data[4]] // OHLC data for y-axis
        }))
    }];

    const options = {
        chart: {
            type: 'candlestick',
            height: 350,
        },
        title: {
            text: 'Candlestick Chart',
            align: 'left'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        }
    };

    return (
        <div>
            {candlechartLoading || !candleChart ? (
            <div className='chart-loading'>
                <CircularProgress style={{ color: 'gold' }} size={50} thickess={1} />
              </div>
            ) : (
                <Chart options={options} series={series} type="candlestick" height={350} />
            )}
        </div>
    );
}

export default CoinCandleChart;
