import coinwatch1 from '../images/coinwatch1.png'


import { useState, useEffect } from 'react';

import Sidebar from './sidebar/Sidebar';
import { useUser } from '../cutom components and hooks/userprovider';



export default function NavBar({userdata}) {


  function getInitials(name) {
    if (!name) setavatarname('');
  
    const nameParts = name.split(' ').filter(Boolean); // Remove extra spaces
    if (nameParts.length > 1) {
      setavatarname(nameParts.map(part => part[0].toUpperCase()).join(''));
    } else {
      setavatarname(name[0].toUpperCase());
    }
  }

  
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [avatarname, setavatarname] = useState('');

    /*const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
        console.log('clicked')
      }; */

    useEffect(()=>{
      getInitials(userdata)
    },[])

    return (
        <>
        <nav className='nav1 '>
            <div className='nav_logos'>
                <img id='coinwatch' src={coinwatch1} alt='logo'></img>
            </div>
            <div className='sidemenu_btn' >
              <Sidebar avatarname={avatarname} />
                
            </div>
            
        </nav>
        
        </>
    )
}




  