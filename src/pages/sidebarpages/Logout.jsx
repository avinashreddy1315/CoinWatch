import React from 'react'
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { auth } from '../../firebase/firebase';
import { useSidebar } from '../../cutom components and hooks/SidebarContext';

import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Logout() {
    const [open, setOpen] = useState(false);
    const { sidebar, setSidebar } = useSidebar();
    const navigate = useNavigate(); // Initialize useNavigate


    useEffect(()=>{
        setOpen(!open);
        if(sidebar == false){
            setSidebar(sidebar)
          }else{
            setSidebar(!sidebar)
          }
    },[])


    const handleClose = () => {
        setOpen(false);
        setSidebar(!sidebar)
        navigate('/wallet/home');
        
     };

     async function handleLogout(){
        try {
            await auth.signOut();
            
      
          } catch (error) {
            //console.log(error.message);
          }
     }
    return (
        <div>
            
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: 'black',
                        margin: 0,
                        position: 'absolute',
                        top: '30%',
                        left: '7%',
                        transform: 'translate(-30%, -20%)',
                        width: '300px',
                        color:'white'
                    },
                }}
            >
                <DialogTitle></DialogTitle>
                <DialogContent>
                    Are you Sure Want to Logout?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary">
                        Logut
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Logout
