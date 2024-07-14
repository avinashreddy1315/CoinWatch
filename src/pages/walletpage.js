import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Link, Outlet} from 'react-router-dom';
import NavBar from '../components/navbar';
import BeforeNavBar from '../components/beforenavbarcomponent';
import OtherRegistration from '../components/other_registationpagecomponent';
import BasicSpeedDial from '../cutom components and hooks/BasicSpeedDail';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '../cutom components and hooks/userprovider';



export default function Wallet({ uid, onLogoutClick, onSearchClick, onCurrencyClick, onFilterClick}) {
  const [userExsist, setUserExsist] = useState(false);
  const [userdata, setUserData] = useState();
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(true);
  const {userData} = useUser()

  useEffect(() => {
    const fetchUserData = async () => {
     // console.log(uid);
      try {
        const userDocRef = doc(db, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
          //console.log(userDocSnapshot.data())
          setSeed(userDocSnapshot.data().seedPhrase);
          setUserExsist(true);
          //console.log(seed, userExsist)
        } else {
          setUserExsist(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid, userData]);

  if (loading) {
    return <div className='loading'><CircularProgress /></div>;
  }

  const handleGoToHomeBack = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      //console.log(error.message);
    }
  };

  return (
    <div>
      {seed && userExsist ? (
        <div className='wallet-container'>
          <NavBar userdata={userdata.name ? userdata.name : 'aa'} />
          <Outlet />
          <div id='wallet-logout'>
            <BasicSpeedDial
              onLogoutClick={onLogoutClick}
              onSearchClick={onSearchClick}
              onCurrencyClick={onCurrencyClick}
              onFilterClick={onFilterClick}
            />
          </div>
        </div>
      ) : (
        <div id="wwww">
          <BeforeNavBar />
          <OtherRegistration />
          <Link to={"/"}><a id='signout_btn' onClick={handleGoToHomeBack}>Go back to Home</a></Link>
        </div>
      )}
    </div>
  );
}
