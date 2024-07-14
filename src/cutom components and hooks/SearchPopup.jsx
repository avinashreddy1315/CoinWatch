import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Slide, DialogContentText, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { Close, Search } from '@mui/icons-material';
import { useCoin } from './CoinContext'; // Adjust the import path as necessary
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { UseSingleCoin } from './SingleCoinContext';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function SearchPopup({ open, onClose }) {
  const [cryptoCoinName, setCryptoCoinName] = useState('');
  const {setSearch} = useCoin()
  const [coinIds, setCoinIds] = useState([])
  const [val, setVal] = useState('')
  const navigate = useNavigate()
  const { setCoinId } = UseSingleCoin();


  const fetchCoinIds = (value) =>{
    const options = {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-GLQ8rCZdg9eL6ZKn7VUUVbfC'
      }
    };
    //console.log(value);
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
    .then((response) => response.json())
    .then((json)=>{
      const result = json.filter((coin)=>{
        return value && coin && coin.id && coin.id.includes(value)
      });
      setCoinIds(result)
    });
      
  }


  // Reset cryptoCoinName when dialog opens
  useEffect(() => {
    if (open) {
      setCryptoCoinName('');
    }
    
    
  }, [open]);


  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const coinName = formJson['crypto-coin'];
    setCryptoCoinName(coinName.toLowerCase());
    //setSearch(cryptoCoinName);
    setCoinId(cryptoCoinName);
    navigate(`/wallet/${cryptoCoinName}`);
    onClose();
  };

  const handlechange = (value)=>{
  
   fetchCoinIds(value);
  setCryptoCoinName(value);
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSearchSubmit,
        style: {
          backgroundColor: '#e0e0e2',
          color: 'white',
          margin: 0,
          position: 'absolute',
          top: '20%',
          left: '7.5%',
          transform: 'translate(-30%, -20%)',
          width: '330px',
          height: '300px',
          borderRadius: '15px',
          padding: '3px',
         
        },
      }}
    >
      
      <DialogContent>
        <TextField
          autoFocus
          id="crypto-coin"
          name="crypto-coin"
          label="Search for Coin"
          type="text"
          fullWidth
          variant="standard"
          value={cryptoCoinName} // Bind value to state
          onChange={(e) => handlechange(e.target.value)} // Update state on change
          InputLabelProps={{
            style: { color: 'black' },
          }}
          InputProps={{
            style: { color: 'black' },
          }}
          sx={{
            '& .MuiInputBase-input': {
              color: 'black',
            },
            '& .MuiInputLabel-root': {
              color: 'black',
            },
            '& .MuiFormHelperText-root': {
              color: 'black',
            },
          }}
        />
        
      </DialogContent>
      <DialogContentText style={{overflow: 'scroll', height: '150px', position: 'relative', margin: '3px 20px'}}>
        <List>
     
        {coinIds.map((coin)=>(
          <ListItem disablePadding style={{color: 'black'}}>
            <ListItemButton key={coin.id}  onClick={()=> setCryptoCoinName(coin.id)}>
            <ListItemText primary={coin.id}/>
            </ListItemButton>
          </ListItem>
          
        ))}
    
      </List>
      </DialogContentText>
     
      <DialogActions>
        <Button onClick={onClose} style={{ color: 'black', border: '1px solid gray', borderRadius: '15px' }}>
         <Close/>
        </Button>
        <Button type="submit" style={{ color: 'white', border: '1px solid gray', borderRadius: '15px', background: 'green' }}>
          <Search/>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchPopup;
