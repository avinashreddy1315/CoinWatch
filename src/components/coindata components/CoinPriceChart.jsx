import React, { useEffect, useState, useRef } from 'react';
import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useCoin } from '../../cutom components and hooks/CoinContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function CoinChart() {
  const { currency } = useCoin();
  const { historicalData, chartLoading, time, coinData, priceChange } = UseSingleCoin();
  const [perchange, setPerChange] = useState();
  const chartRef = useRef(null);

  const priceChangeper = coinData?.market_data?.[`price_change_percentage_${priceChange}`];

  const borderColor = priceChangeper > 0 ? '#00a83e' : '#ff3833';

  useEffect(() => {
    //console.log(historicalData)
    //console.log(time)
    //console.log(priceChangeper)
  });

  const formatDate = (date, time) => {
    const options = {
      month: 'numeric',
      day: 'numeric'
    };
    if (time === '365') {
      options.year = '2-digit';
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatTick = (value, currencySymbol) => {
    if (value === 0) return `${currencySymbol}0`;

    // Format small numbers to show only significant digits
    if (value < 1) {
      let formattedValue = value.toFixed(4).replace(/\.?0+$/, ''); // Remove trailing zeros
      if (formattedValue.length > 3) {
        formattedValue = formattedValue.slice(0, 3);
      }
      return `${currencySymbol}${formattedValue}`;
    }

    // Add comma as thousand separator for larger numbers
    let formattedValue = `${value.toFixed(2).replace(/\.00$/, '')}`; // Remove .00 if present
    return `${currency.symbol}${formattedValue}`;
  };

  return (
    <div>
      {!historicalData || chartLoading ? (
        <div className='chart-loading'>
          <CircularProgress style={{ color: 'gold' }} size={50} thickess={1} />
        </div>
      ) : (
        <>
          <Line
            ref={chartRef}
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time = date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}: ${date.getMinutes()} AM`;
                return formatDate(date, time);
              }),
              datasets: [{
                data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${time} Days) in ${currency.name}`,
                borderWidth: 1.5,
                borderColor: borderColor,
                fill: true,
                backgroundColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) {
                    // This case happens on initial chart load
                    return null;
                  }
                  if (priceChangeper > 0) {
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, '#c2f4ca');
                    gradient.addColorStop(0.2, '#a9f4b4');
                    gradient.addColorStop(0.4, '#90f49c');
                    gradient.addColorStop(0.6, '#74f383');
                    gradient.addColorStop(1, '#52f267');
                    return gradient;
                  } else {
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, '#f4eff0');
                    gradient.addColorStop(0.2, '#fac0c9');
                    gradient.addColorStop(0.4, '#fa909b');
                    gradient.addColorStop(0.6, '#f25c67');
                    gradient.addColorStop(1, '#e10b31');
                    return gradient;
                  }
                }
              }]
            }}
            options={{
              elements: {
                line: {
                  tension: 0.4 // Adjust the line tension to make it smoother
                },
                point: {
                  radius: 0,
                }
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  }
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    callback: function (value) {
                      return formatTick(value, currency.symbol);
                    }
                  }
                }
              },
              maintainAspectRatio: false
            }}
            height={220}
          />
        </>
      )}
    </div>
  );
}

export default CoinChart;
