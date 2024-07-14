import { Skeleton } from '@mui/material'
import React from 'react'

function SingleCoinDataLoading() {
  return (
    <>
      <span className='Coin-Image'>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <div style={{ lineHeight: '5px', paddingTop: '9px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Skeleton animation="wave" variant='rounded' width={70} height={15} />
          <Skeleton animation="wave" variant='rounded' width={30} height={15} />

        </div>
        <div >
          <Skeleton animation="wave" variant='rounded' width={20} height={10} />
        </div>
      </span>
      <div className='chart-time'>
        <Skeleton animation="wave" variant='rounded' width={100} height={25} />
      </div>
      <div className='chart' style={{ margin: '15px 0px 5px 0px' }}>
        <Skeleton animation="wave" variant='rounded' width={320} height={200} />
      </div>
      <div className='market-data data' >
            
            <Skeleton animation="wave" variant='rounded' width={320} height={220}/>   
      </div>
      <div className='Historical-data data' >
            <Skeleton animation="wave" variant='rounded' width={320} height={180}/>    
      </div>
    </>


  )
}

export default SingleCoinDataLoading
