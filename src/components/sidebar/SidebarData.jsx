import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FaceIcon from '@mui/icons-material/Face';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import InfoIcon from '@mui/icons-material/Info';
import LockResetIcon from '@mui/icons-material/LockReset';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';


export const SidebarData = [
    {
        title:'Home',
        path:'/wallet',
        icon: <HomeIcon color='primary'/>,
    },
    {
        title:'Profile',
        path:'#',
        icon: <FaceIcon color='secondary'/>,
        iconClosed: <ArrowDropDownIcon/>,
        iconOpend: <ArrowDropUpIcon/>,
        subNav: [
            {
                title: 'Personal Info',
                path:'profile/info',
                icon: <InfoIcon/>,
            },
            {
                title: 'Reset Password',
                path:'profile/passwordreset',
                icon: <LockResetIcon color='error'/>,
            },

        ]
    },

    {
        title:'Dashboard',
        icon: <DashboardCustomizeIcon color='warning'/>,
        path:'dashboard',

    },
    {
        title:'favourite',
        icon: <FavoriteIcon color='error'/>,
        path:'favourite',
    },
    
]