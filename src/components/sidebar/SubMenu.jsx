import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';


const SidebarLink = styled(Link)`
display: flex;
color: #e1e9fc;
justify-content:space-between;
text-decoration:none;
align-item: center;
padding: 0px 5px 20px 15px;
list-style:none;
font-size: 19px;
font-weight: bold;
width: 220px;
height: 47px;



&:hover {
    background-color: #252831;
    border-right: 5px solid #632ce4;
    
}
`;

const SideBarLabel = styled.div`
   
`;

const DropdownLink = styled(Link)`
    background: #414757;
    height: 50px;
    padding-top: 10px;
    padding-left: 38px;
    display: flex;
    align-item:center;
    text-decoration:none;
    color: #f5f5f5;
    flex-direction:row;
    gap:10px;
    transition: 0.2s all ease-in;


    &:hover{
        background: #632ce4;
    }
    
    
`;

const SubMenu = ({item, key}) => {

    const [subnav, setSubnav] = useState(false);

    const showSubnav = ()=> setSubnav(!subnav);




    

  return (
    <div > 
        <SidebarLink to={item.path}  onClick={item.subNav ? showSubnav : item.onClick ? item.onClick : null}>
            <div  key={item.title} id='menu' >
                <span>{item.icon}</span>
                <SideBarLabel>{item.title}</SideBarLabel>
            </div>
            <div>
                {item.subNav && subnav ? item.iconOpend : item.subNav ? item.iconClosed : null}
            </div>
        </SidebarLink>
        {subnav && item.subNav.map((item, index)=>{
            return(
                <DropdownLink to={item.path} key={index}>
                    <span>{item.icon}</span>
                    <SideBarLabel>{item.title}</SideBarLabel>
                </DropdownLink>
            )
        })}
      
    </div>
  )
}

export default SubMenu
