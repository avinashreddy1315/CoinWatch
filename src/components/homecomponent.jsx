
import { useState, useEffect } from 'react';

import AnimatedPage from './pageAnimations/AnimatedPage';
import { useSidebar } from '../cutom components and hooks/SidebarContext';
import { useCoin } from '../cutom components and hooks/CoinContext';
import Cointable from './coindata components/cointable';
import TradingViewWidget from './TradingView Widgets/TradingViewWidgetHotCoins';
import TrendingCoins from './TradingView Widgets/TrendingCoins';





export default function Home({ uid}) {
  const { sidebar, setSidebar } = useSidebar();
  const { allCoin, loading, currency, setSearch } = useCoin();

  useEffect(() => {
    //console.log(uid);
    if (sidebar == false) {
      setSidebar(sidebar)
    } else {
      setSidebar(!sidebar)
    }
    setSearch('')

  }, [uid])

  return (
    <AnimatedPage>
    
        <div className='home'>
          <p style={{marginBottom : '0px', padding : '5px 5px 0px 5px', fontWeight : '700'}}>Trending Coins</p>
          
          <TrendingCoins/>
         <Cointable />
        </div>
    </AnimatedPage>
  )

}