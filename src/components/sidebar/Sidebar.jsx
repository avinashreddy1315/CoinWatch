import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { useSidebar } from '../../cutom components and hooks/SidebarContext';


/*styled-components Library

styled-components is a popular library for styling React components.
 It allows you to write plain CSS inside your JavaScript, leveraging 
 tagged template literals to create styled React components.

 SidebarWrap
The SidebarWrap styled component defines a div with specific CSS properties. 
*/
const SideNav = styled.div`
  /*background:#15171c;
  height:80px; */
  display:flex;
  justify-content: flex-start; 
  align-items: center;
`;

const SideIcon = styled(Link)`
  
  display: flex; 
  justify-content:flex-start;
  align-items:center;
  text-decoration:none;
  padding: 10px 10px 0px 10px;
`;

const SidebarNav = styled.nav`
position:absolute;
background: rgb(58, 21, 9);
width:220px;
height:100vh;  //Changed the side bar height to 100vh from 95vh
z-index:999;
top:0px;
display: flex;
justify-content: center;
align-item: center;
right: ${({sidebar})=>(sidebar ? '0' : '-100%')};
transition: 450ms;


`;

const SidebarWrap = styled.div`
  width:100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  
`;


const Sidebar = ({ avatarname }) => {
  const { sidebar, setSidebar } = useSidebar(false)

  //const [sidebar, setsidebar] = useState(false);

  const showsidebar = () => setSidebar(!sidebar);

  

  return (
    <>
      <SideNav>
        <SideIcon to="#">
          <Avatar onClick={showsidebar} className='avatar' id='avatar' sx={{ bgcolor: deepOrange[500] }}>{avatarname}</Avatar>
        </SideIcon>
      </SideNav>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <SideIcon to="#">
            <CloseIcon fontSize="large"  onClick={showsidebar} id="closeicon" color='black'/>
          </SideIcon>
          <div id="mmm">
          {SidebarData.map((item, index)=>{
              return <SubMenu item={item} key={index}/>
          })}
          </div>
        </SidebarWrap>
      </SidebarNav>
    </>
  )
}

export default Sidebar
