import React, { useState, useEffect } from 'react';
import AnimatedPage from '../../components/pageAnimations/AnimatedPage';
import { useSidebar } from '../../cutom components and hooks/SidebarContext';
import { useUser } from '../../cutom components and hooks/userprovider';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Adjust the path as needed
import { Button, TextField } from '@mui/material';
import '../../css/personal_info.css'
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Personalinfo() {
  const { sidebar, setSidebar } = useSidebar();
  const { data, loading } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    if(sidebar){
      setSidebar(!sidebar);
    }
    
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [data]);

  const handleSave = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', data.uid);
    try {
      await updateDoc(userDocRef, { name, email });
      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsSaveEnabled(false);
    } catch (error) {
      console.error('Error updating user details: ', error);
    }
  };

  const handleEditClick = (field) => {
    if (field === 'name') {
      setIsEditingName(!isEditingName);
    } else if (field === 'email') {
      setIsEditingEmail(!isEditingEmail);
    }
    setIsSaveEnabled(true);
    if(isEditingName == true){
      setIsSaveEnabled(false);
    }
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='personal_info'>
    <AnimatedPage>
      <div>
        <h4>Personal info</h4>
        <div className='name filed'>
          <label className='lal'>Name: </label>
          <div className='edit_name edit'>
          {isEditingName ? (
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{name}</span>
          )}
          <Button onClick={() => handleEditClick('name')}>
            {isEditingName ? <HighlightOffIcon/> : <EditIcon/>}
          </Button>
          </div>
        </div>
        <div className='email filed'>
          <label className='lal'>Email: </label>
          <div className='edit_email edit'>
          {isEditingEmail ? (
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <span>{email}</span>
          )}
          <Button disabled={true} onClick={() => handleEditClick('email')}>
            {isEditingEmail ? <HighlightOffIcon/> : <EditIcon/>}
          </Button>
        </div>
        </div>
        <div className='edit_save_button'>
        <Button  variant="contained" color="primary" disabled={!isSaveEnabled} onClick={handleSave}>
          Save
        </Button>
        </div>
      </div>
    </AnimatedPage>
    </div>
  );
}

export default Personalinfo;
