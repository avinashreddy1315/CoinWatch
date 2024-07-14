import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField, Slide, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { useCoin } from './CoinContext'; // Adjust the import path as necessary



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function CurrencyChangeDialog({ open, onClose }) {

    const [selectCurrency, setSelectCurrency] = useState('usd')
    const { setCurrency } = useCoin();

    const handleCurrencyChange = (event)=>{
        setSelectCurrency(event.target.value);
        
        
        
    }

    const handlesave = () =>{
        switch (selectCurrency) {
            case "usd": {
                setCurrency({ name: "USD", symbol: "$", value: 'usd' });
                break;
            }
            case "inr": {
                setCurrency({ name: "INR", symbol: "₹", value: 'inr' });
                break;
            }
            case "gbp": {
                setCurrency({ name: "GBP", symbol: "£", value: 'gbp' });
                break;
            }
            case "eur": {
                setCurrency({ name: "EUR", symbol: "€", value: 'eur' });
                break;
            }
            case "jpy": {
                setCurrency({ name: "JPY", symbol: "¥", value: 'jpy' });
                break;
            }
            case "rub": {
                setCurrency({ name: "RUB", symbol: "₽", value: 'rub' });
                break;
            }
            default: {
                setCurrency({ name: "USD", symbol: "$", value: 'usd' });
                break;
            }
        }
        onClose();

    }


    const currency = [
        { name: "USD", symbol: "$", icon: <AttachMoneyIcon />, value: 'usd' },
        { name: "INR", symbol: "₹", icon: <CurrencyRupeeIcon />, value: 'inr' },
        { name: "GBP", symbol: "£", icon: <CurrencyPoundIcon />, value: 'gbp' },
        { name: "EUR", symbol: "€", icon: <EuroIcon />, value: 'eur' },
        { name: "JPY", symbol: "¥", icon: <CurrencyYenIcon />, value: 'jpy' },
        { name: "RUB", symbol: "₽", icon: <CurrencyRubleIcon />, value: 'rub' }
    ];
    
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            PaperProps={{
                component: 'form',
                style: {
                    backgroundColor: '#e0e0e2',
                    color: 'white',
                    margin: 0,
                    position: 'absolute',
                    top: '20%',
                    left: '7.5%',
                    transform: 'translate(-30%, -20%)',
                    width: '300px',
                    borderRadius: '15px',
                    padding: '3px',
                },
            }}>
            <DialogContent>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group" style={{color:'black', fontWeight: 'bold'}}>Select Currency
                    {<div style={{color: 'gray', fontSize: '12px', fontWeight: '400'}}>please click save to show the result</div>}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectCurrency}
                        onChange={handleCurrencyChange}
                        style={{marginTop : '10px'}}
                    >
                    {currency.map((curr)=>(
                        <FormControlLabel style={{color : selectCurrency == curr.value ? 'blue':'black' }} key={curr.name} value={curr.value} control={<Radio />} label={
                        <Box display="flex" alignItems="center" style={{marginLeft : '5px'}}>
                            {curr.icon} <span style={{marginLeft : '9px'}}>{curr.name}</span>
                        </Box>}/>
                    ))}
                    </RadioGroup>
                </FormControl>

                <DialogActions>
                    <Button onClick={handlesave} style={{ color: 'black', border: '0.5px solid gray', borderRadius: '15px', backgroundColor: 'green', fontWeight: 'bold' }}>
                        Save
                    </Button>
                </DialogActions>

            </DialogContent>
        </Dialog>
    )
}

export default CurrencyChangeDialog
