

import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import { Formik, useFormik, Field, ErrorMessage, Form } from "formik";
import * as yup from 'yup';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import { Link, Outlet } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Chip from "@mui/material/Chip";
import LockIcon from '@mui/icons-material/Lock';
import { event } from 'jquery';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useUser } from "../cutom components and hooks/userprovider";








export default function LoginComponent() {
    //is to show and hide the password
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailerror, setEmailerror] = useState(false);
    const [passworderror, setPassworderror] = useState(false);
    const [emailerrormsg, setEmailerrormsg] = useState('');
    const [passworderrormsg, setPassworderrormsg] = useState('');
    const [button, setbutton] = useState(true)

    const [snack, setsnack] = useState(false);
    const [snackmsg, setsnackmsg] = useState('');
    const [severity, setseverity] = useState('');

    const { userData, setUserData } = useUser();

    //is to handle email validation
    const handleemail = (event) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(event.target.value);
        if (isValidEmail) {
            setEmailerror(false);
            setEmailerrormsg('')
            setEmail(event.target.value);
            
        }
        else {
            setEmailerror(true);
            setEmailerrormsg('enter valid email')
        }
    }

    function handleemailnull(e){
        if(email == ''){
            setEmailerror(true);
            setEmailerrormsg('enter email')
            setbutton(true);

        }
    }

    function handlepasswordnull(e){
        if(password == ''){
            setPassworderror(true)
            setPassworderrormsg("Enter Password");
            setbutton(true);
        }
    }

    // is to handle password
    const handlepassword = (event) => {
        const value = event.target.value
        if(value == ''){
            setbutton(true);
            return;
        };
        setPassworderrormsg("");
        setPassworderror(false);
        setPassword(event.target.value);
        setbutton(false);
          
    }

    

    //is to handle form submit
    async function handlesubmit(e) {
        e.preventDefault();
        try{
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUserData({ name: result.user.displayName, email: result.user.email, uid:result.user.uid, exits:true });
            //console.log(result);
            setsnack(true);
            setsnackmsg('User Logged In Succesfullt');
            setseverity('success');
            
           
        }catch(error){
            //console.log(error.code);
            setsnack(true);
            setsnackmsg(error.code);
            setseverity('error');
        }

    }



   


    return (

        <div className="login_form">
            <Snackbar id='snack_bar'
                         open={snack} 
                         autoHideDuration={1800}
                         TransitionComponent={Slide}
                            anchorOrigin={{
                                vertical: 'top', // Adjust as needed
                                horizontal: 'center', // Adjust as needed
                              }}
                              onClose={() => setsnack(false)}
                        >
                            <Alert

                                severity={severity}
                                variant="filled"
                                sx={{ width: '90%' }}
                            >
                                {snackmsg}
                            </Alert>
                            
            </Snackbar>
            <form onSubmit={handlesubmit}  noValidate autoComplete="off">
                <Paper id="paper" square={false} className="p-2 pt-3" elevation={3}>

                    <Chip className="fs-6" icon={<LockIcon />} size="large" label="Login" color="primary" />
                    <TextField
                        className="mt-3 mb-1"
                        id="email"
                        name="Email"
                        label="Email"
                        size="small"
                        fullWidth
                        variant="outlined"
                        onChange={handleemail}
                        onBlur={handleemailnull}
                        required
                        error={emailerror} // Use error prop to conditionally display error state
                        helperText={emailerrormsg} // Helper text to display error message
                    />
                    <TextField
                        className="mt-2 "
                        id="password"
                        name="Password"
                        label="Password"
                        size="small"
                        fullWidth
                        variant="outlined"
                        required
                        onChange={handlepassword}
                        onBlur={handlepasswordnull}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={passworderror} // Use error prop to conditionally display error state
                        helperText={passworderrormsg} // Helper text to display error message

                    />
                    <dd className="text-danger"></dd>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <Link to={'/forget_password'}>
                            <a href='#'>Forgot Password?</a>
                        </Link>
                        <button  disabled={button} type='submit' id="login_btn_logincomponent"><LoginIcon fontSize="medium" /></button>
                    </div>

                </Paper>
            </form>

        </div>

    )
}