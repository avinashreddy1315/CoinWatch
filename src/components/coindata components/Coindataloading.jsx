import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useCoin } from '../../cutom components and hooks/CoinContext';
import { useState, useEffect } from 'react';

function Coindataloading() {
    const { allCoin, loading, currency } = useCoin();
    const [skeletonCount, setSkeletonCount] = useState(0);
    //m
    useEffect(()=>{
        setSkeletonCount(allCoin.length)
        
    },[currency, allCoin])
  return (
    <Stack spacing={1}>
        {[...Array(skeletonCount)].map((_, index) => (
                <Skeleton style={{justifyContent:'center', alignItems: 'center', display: 'flex', marginTop: '5px'}} key={index} variant="rectangular" animation="wave" width={350} height={45} />
        ))}
    </Stack>
  )
}

export default Coindataloading
