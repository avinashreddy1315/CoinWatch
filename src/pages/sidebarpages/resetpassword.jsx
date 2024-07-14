import React, { useState, useEffect } from 'react';
import { useSidebar } from '../../cutom components and hooks/SidebarContext';
import { Box, Button, TextField, Typography, Stepper, Step, StepLabel, Snackbar, Alert, Slide } from '@mui/material';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, updatePassword } from 'firebase/auth';
import AnimatedPage from '../../components/pageAnimations/AnimatedPage';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  margin: '3px 5px'
}));

const ResetHeading = styled(Typography)(({ theme }) => ({
  fontWeight: '800'
}));

const SeedPhraseEnter = styled(Box)(({ theme }) => ({
  margin: '0px 5px'
}));

const PasswordResetSnack = styled(Snackbar)(({ theme }) => ({
  position: 'absolute',
  top: '150px',
  width: '100%'
}));

const steps = ['Enter Seed Phrase', 'Enter New Password'];

function Resetpassword({ uid }) {
  const { sidebar, setSidebar } = useSidebar();
  const [activeStep, setActiveStep] = useState(0);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (sidebar) {
      setSidebar(!sidebar);
    }
  }, [sidebar, setSidebar]);

  const handleNext = async () => {
    if (activeStep === 0) {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().seedPhrase === seedPhrase) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid seed phrase. Please try again.');
        setSnackbarMessage('Invalid seed phrase. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else if (activeStep === 1) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
        setSnackbarMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      const auth = getAuth();
      const user = auth.currentUser;

      try {
        await updatePassword(user, newPassword);
        setSnackbarMessage('Password updated successfully.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        setErrorMessage('Error updating password. Please try again.');
        setSnackbarMessage('Error updating password. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <AnimatedPage>
      <StyledBox>
        <PasswordResetSnack
          autoHideDuration={1800}
          TransitionComponent={Slide}
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </PasswordResetSnack>
        <Box sx={{ width: '100%', mt: 4 }}>
          <ResetHeading variant="h5" gutterBottom> Reset Password </ResetHeading>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ fontWeight: '700' }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <SeedPhraseEnter>
                <TextField
                  label="Seed Phrase"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={seedPhrase}
                  onChange={(e) => setSeedPhrase(e.target.value)}
                  helperText="Enter your 12-word seed phrase"
                />
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Button sx={{ marginTop: '9px' }} variant="contained" color="primary" onClick={handleNext}>
                  Verify Seed Phrase
                </Button>
              </SeedPhraseEnter>
            )}
            {activeStep === 1 && (
              <Box>
                <TextField
                  label="New Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  helperText="Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character"
                />
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Reset Password
                </Button>
              </Box>
            )}
            {activeStep === 2 && (
              <Typography variant="h6" color="success">
                Password reset successfully. You can now log in with your new password.
              </Typography>
            )}
          </Box>
        </Box>
      </StyledBox>
    </AnimatedPage>
  );
}

export default Resetpassword;
