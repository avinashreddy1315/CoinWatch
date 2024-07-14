
import './App.css';
import './css/welcomepage.css'
import './css/loginpage.css'
import './css/registerpage.css'
import './css/wallet.css'
import { BrowserRouter, Routes, Route, Link, Switch, Outlet, Navigate, useNavigate, Router, useLocation } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import WelcomePage from './pages/welcomepage';
import RegisterPage from './pages/beforeloginpages/registerpage';
import LoginPage from './pages/beforeloginpages/loginpage';
import { useState, useEffect } from 'react';
import RegisterComponent from './components/registercomponent';
import { auth, db } from './firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Wallet from './pages/walletpage';
import { ThemeProvider } from '@mui/material/styles';
import './css/navbar.css';
import Home from './components/homecomponent';
import Favourite from './pages/sidebarpages/favourite'
import Personalinfo from './pages/sidebarpages/personalinfo';
import Resetpassword from './pages/sidebarpages/resetpassword';
import Dashboard from './pages/sidebarpages/dashboard';
import { onAuthStateChanged, sendEmailVerification, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider } from 'firebase/auth';
import BeforeNavBar from './components/beforenavbarcomponent';
import BeforeNavbarLayout from './pages/beforeloginpages/beforenavbarlayout';
import { AnimatePresence } from 'framer-motion';
import LogoutDialog from './cutom components and hooks/LogoutDialog';
import SearchPopup from './cutom components and hooks/SearchPopup';
import CurrencyChangeDialog from './cutom components and hooks/CurrencyChangeDialog';

import './css/home.css'
import './css/cointable.css'
import './css/coindetails.css'
import FilterDialog from './cutom components and hooks/FilterDialog';
import { useUser } from './cutom components and hooks/userprovider';
import Coindetails from './pages/Coindetails';
import ForgetPassword from './components/ForgetPassword';









function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setuser] = useState('');

  const {setUserId} = useUser()

  


  
 



  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setuser(user);
        
        if (user && user.uid) {
          setUserId(user.uid ? user.uid : '')
          navigate('/wallet/home')

        } else {
          navigate('/');
        }
      });

    }, 10000);




    return () => {

      unsubscribe();
    };




  }, [user])

  //all this three are for  logout popup
  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setLogoutOpen(false);
      navigate('/');
    } catch (error) {
      //console.log(error.message);
    }
  };

  //all this are for handeling search popup
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchClick = ()=>{
    setSearchOpen(true);
  }

  const handleSearchClose = () => {
    setSearchOpen(false);
  };


  //all this are for handeling currency popup
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const handleCurrencyClick = ()=>{
    setCurrencyOpen(true);
  }

  const handleCurrencyClose = () => {
    setCurrencyOpen(false);
  };

  //all this is for handaling filter popup
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClick = ()=>{
    setFilterOpen(true);
  }

  const handleFilterClose = ()=>{
    setFilterOpen(false)
  }





  return (
    <div >
      <div className="App }">
        {user ?
          (<>
           
          <Routes  >

            <Route path="/wallet" element={<Wallet uid={user.uid} onLogoutClick={handleLogoutClick} onSearchClick={handleSearchClick} onCurrencyClick={handleCurrencyClick} onFilterClick={handleFilterClick}/>}>
              <Route index element={<Navigate to="/wallet/home" replace />} />
              <Route path="home" element={<Home uid={user.uid} />} />
              <Route path='dashboard' element={<Dashboard uid={user.uid} />} />
              <Route path='favourite' element={<Favourite uid={user.uid} />} />
              <Route path='profile/info' element={<Personalinfo uid={user.uid} />} />
              <Route path='profile/passwordreset' element={<Resetpassword uid={user.uid} />} />
              <Route path="/wallet/:coinId" element={<Coindetails />} />
            </Route>


          </Routes>
          
          <LogoutDialog open={logoutOpen} onClose={handleLogoutClose} onLogout={handleLogout} />
          <SearchPopup open={searchOpen} onClose={handleSearchClose}  />
          <CurrencyChangeDialog open={currencyOpen} onClose={handleCurrencyClose}/>
          <FilterDialog open={filterOpen} onClose={handleFilterClose}/>
          
         
          
          
        </>)

          : (
            <>
            <AnimatePresence mode='wait'>
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<WelcomePage />} />
              <Route element={<BeforeNavbarLayout/>}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/forget_password" element={<ForgetPassword/>}/>
              </Route>
            </Routes>
            </AnimatePresence></>)
        }



      </div>


    </div>
  );
}

export default App;