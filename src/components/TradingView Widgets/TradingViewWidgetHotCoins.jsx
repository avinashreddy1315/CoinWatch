import React, { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    // Check if the script already exists
    if (!document.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          {
            description: '',
            proName: 'BINANCE:BTCUSDT'
          },
          {
            description: '',
            proName: 'COINBASE:ETHUSD'
          },
          {
            description: '',
            proName: 'COINBASE:SHIBUSD'
          },{
            description: '',
            proName: 'COINBASE:SOLUSD'
          }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: 'adaptive',
        colorTheme: 'light',
        locale: 'en'
      });
      document.getElementsByClassName('tradingview-widget-container__widget')[0].appendChild(script);
    }
  }, []);

  return (
    <>
    <div className="tradingview-widget-container"  style={{margin : '2px 5px 15px 5px'}}>
      
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="#" rel="noopener nofollow" target="_blank">
          
        </a>
      </div>
    </div>
    </>
  );
};

export default TradingViewWidget;
