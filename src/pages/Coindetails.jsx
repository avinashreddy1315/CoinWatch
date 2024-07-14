import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoinDeatialsAnimation from '../components/pageAnimations/CoinDeatialsAnimation';
import SingleCoinData from '../components/coindata components/SingleCoinData';
import CloseIcon from '@mui/icons-material/Close';
import SingleCoinDataLoading from '../components/coindata components/SingleCoinDataLoading';
import { UseSingleCoin } from '../cutom components and hooks/SingleCoinContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useUser } from '../cutom components and hooks/userprovider';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

function Coindetails() {
  const navigate = useNavigate();
  const { coinDataLoading, coinData } = UseSingleCoin();
  const { data, setData } = useUser();
  const [favText, setfavText] = useState('Add to Favourite');

  useEffect(() => {
    if (data?.favourite?.includes(coinData?.id)) {
      setfavText('Remove from Favourite');
    } else {
      setfavText('Add to Favourite');
    }
  }, [data, coinData]);

  const goback = () => {
    navigate('/wallet');
  };

  const addToFavourite = async (id) => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', data.uid); // Replace 'users' with your Firestore collection and data.uid with the user ID

    let updatedFav;
    if (data.favourite.includes(id)) {
      // Remove from favorites
      updatedFav = data.favourite.filter((favId) => favId !== id);
      setfavText('Add to Favourite');
    } else {
      // Add to favorites
      updatedFav = [...data.favourite, id];
      setfavText('Remove from Favourite');
    }

    try {
      await updateDoc(userDoc, {
        favourite: updatedFav
      });
      setData({ ...data, favourite: updatedFav }); // Update the user data context with the new favorites array
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <CoinDeatialsAnimation>
      <div className='details'>
        <button className='coindetail-close' style={{ float: 'right' }} onClick={goback}><CloseIcon fontSize='medium' /></button>
        <div className='details-main'>
          {coinDataLoading ? <SingleCoinDataLoading /> : <SingleCoinData />}
        </div>
        <div className='favourite_btn'>
          <button onClick={() => addToFavourite(coinData.id)} style={{ color: 'white' }}>
            <FavoriteIcon style={{ color: 'white' }} />
            {favText}
          </button>
        </div>
      </div>
    </CoinDeatialsAnimation>
  );
}

export default Coindetails;
