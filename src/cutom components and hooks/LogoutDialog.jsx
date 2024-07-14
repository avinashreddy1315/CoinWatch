import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


const LogoutDialog = ({ open, onClose, onLogout }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#e0e0e2',
          color: 'black',
          margin: 0,
          position: 'absolute',
          top: '30%',
          left: '7.5%',
          transform: 'translate(-30%, -20%)',
          width: '300px',
          borderRadius: '15px',
          padding: '5px'
        },
      }}
    >  
      <DialogContent>
        Are you sure you want to logout?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: 'black', border: '0.5px solid gray', borderRadius: '15px', fontSize: 'bold'}}>
          Cancel
        </Button>
        <Button onClick={onLogout} style={{ color: 'white',border: '2px solid white', borderRadius: '15px', backgroundColor: 'red'  }}>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
