import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { TextField, Button, Snackbar, Alert, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const ForgetPasswordPage = styled('div')(({ theme }) => ({
  margin: '30px 10px',
}));

const ForgetSnack = styled(Snackbar)(({ theme }) => ({
  position: 'absolute',
  top: 150,
  width: '100%',
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
}));

const BtnGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '5px',
}));

const GoBack = styled('div')(({ theme }) => ({
  float: 'right',
  marginTop: '50px',
  marginRight: '10px',
}));

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePasswordReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setSnackbarMessage('Password reset email sent. Check your inbox.');
      setSnackbarSeverity('success');
      setResetEmailSent(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setSnackbarMessage('Email not registered.');
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('Error sending password reset email.');
        setSnackbarSeverity('error');
      }
    }
    setSnackbarOpen(true);
  };

  return (
    <ForgetPasswordPage>
      <ForgetSnack
        open={snackbarOpen}
        autoHideDuration={1800}
        TransitionComponent={Slide}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </ForgetSnack>
      <Heading variant="h6">Forget Password</Heading>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        fullWidth
        margin="normal"
      />
      <BtnGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordReset}
          disabled={resetEmailSent}
        >
          Reset Password
        </Button>
        {resetEmailSent && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePasswordReset}
          >
            Resend Email
          </Button>
        )}
      </BtnGroup>
      <GoBack>
        <Link to={"/"}>Go back Home?</Link>
      </GoBack>
    </ForgetPasswordPage>
  );
}

export default ForgetPassword;
