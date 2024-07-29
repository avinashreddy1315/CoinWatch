import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useCoin } from '../../cutom components and hooks/CoinContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';
import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CarouselContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid gray',
  height: '70px',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#f0f0f0',
  margin: '2px 5px 15px 5px',
}));

const CoinItem = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0 50px',
  boxSizing: 'border-box',
}));

const Icon = styled('img')(({ theme }) => ({
  width: '25px',
}));

const CoinImgName = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  fontWeight: '500',
  fontSize: '13px',
}));

const Price = styled('div')(({ theme }) => ({
  marginTop: '5px',
  whiteSpace: 'nowrap',
}));

const PriceGreen = styled(Price)(({ theme }) => ({
  color: 'green',
}));

const PriceRed = styled(Price)(({ theme }) => ({
  color: 'red',
}));

function TrendingCoins() {
  const { allCoin, currency, trendingcoin } = useCoin();
  const [showCoins] = useState(['btc', 'eth', 'sol', 'bnb', 'doge']);
  const { setCoinId } = UseSingleCoin();
  const navigate = useNavigate();

  // Function to format price
  const formatPrice = (price) => {
    if (Number.isInteger(price)) {
      return `${price}`;
    } else {
      return price.toFixed(2); // Ensuring fixed decimal places
    }
  };

  const GoCoin = (id) => {
    console.log(`Clicked coin ID: ${id}`); // Debugging log
    setCoinId(id);
    navigate(`/wallet/${id}`);
  };

  // Filter coins based on showCoins array
  const trendingCoins = Object.values(trendingcoin)
  .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
  .slice(0, 5)
  .map(coin => (
    <CoinItem key={coin.symbol} onClick={() => GoCoin(coin.id)}>
      <CoinImgName>
        <Icon src={coin.image} alt='coin icon' />
        <span>{coin.symbol.toUpperCase()}{currency.value.toUpperCase()}</span>
      </CoinImgName>
      {coin.price_change_percentage_24h > 0 ? (
        <PriceGreen>
          <ArrowDropUpIcon /> {currency.symbol} {formatPrice(coin.current_price)}
        </PriceGreen>
      ) : (
        <PriceRed>
          <ArrowDropDownIcon /> {currency.symbol} {formatPrice(coin.current_price)}
        </PriceRed>
      )}
    </CoinItem>
  ));



  // Configure AliceCarousel options
  const carouselOptions = {
    mouseTracking: true,
    infinite: true,
    autoPlay: true, // Enable auto play
    autoPlayInterval: 1000, // Interval between slides in milliseconds
    animationDuration: 800, // Animation duration in milliseconds
    disableButtonsControls: true, // Disable buttons controls
    disableDotsControls: true, // Disable dots controls
    responsive: {
      0: {
        items: 3,
      },
      512: {
        items: 3,
      },
    },
  };

  return (
    <CarouselContainer>
      <AliceCarousel {...carouselOptions}>
        {trendingCoins}
      </AliceCarousel>
    </CarouselContainer>
  );
}

export default TrendingCoins;
