import React from 'react'
import BeforeNavBar from '../../components/beforenavbarcomponent'
import { Link, Outlet } from 'react-router-dom'

function BeforeNavbarLayout() {
  return (
    <div>
      <Link to="/"><BeforeNavBar/></Link>
      <Outlet/>
    </div>
  )
}

export default BeforeNavbarLayout
