import { useState } from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import {  Box, SpeedDial, SpeedDialAction } from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';



export default function BasicSpeedDial({ onLogoutClick, onSearchClick, onCurrencyClick, onFilterClick}) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 
      
     
    const actions = [
        { icon: <LogoutIcon />, name: 'Logout', onClick: onLogoutClick },
        { icon: <CurrencyExchangeIcon />, name: 'Currency', onClick: onCurrencyClick  },
        { icon: <SearchIcon />, name: 'Search', onClick: onSearchClick },
        { icon: <FilterAltRoundedIcon />, name: 'Filter', onClick: onFilterClick },
        
      ];


      

  return (
    <Box sx={{ height: 300, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 0, right: 0, }}
        icon={<SpeedDialIcon />}
        onMouseEnter={handleOpen}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
