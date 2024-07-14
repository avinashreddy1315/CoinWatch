import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import LoginIcon from '@mui/icons-material/LoginOutlined';
import Paper from '@mui/material/Paper';
import Chip from "@mui/material/Chip";
import WalletIcon from '@mui/icons-material/Wallet';
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Tooltip from '@mui/material/Tooltip';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { useUser } from "../cutom components and hooks/userprovider";
import AnimatedPage from './pageAnimations/AnimatedPage';








export default function RegisterComponent() {
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    const [newseedphase, setnewseedphase] = useState(null);


    const [emailerror, setEmailerror] = useState(false);
    const [passworderror, setPassworderror] = useState(false);
    const [nameerror, setnameerror] = useState(false);
    const [emailerrormsg, setEmailerrormsg] = useState('');
    const [namerrormsg, setnamerrormsg] = useState('');
    const [passworderrormsg, setPassworderrormsg] = useState('');
    const [button, setbutton] = useState(true);
    const [next, setnext] = useState(true);
    const [tool, settool] = useState(false);
    const [snack, setsnack] = useState(false);
    const [snackmsg, setsnackmsg] = useState('');
    const [severity, setseverity] = useState('');
    const { userData, setUserData } = useUser();
    const [favourite, setfavourite] = useState([]);
    const [dashboard, setdashboard] = useState([]);
    



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

    function handleemailnull(e) {
        if (email == '') {
            setEmailerror(true);
            setEmailerrormsg('enter email')
            setbutton(true);

        }
    }

    function handlepasswordnull(e) {
        if (password == '') {
            setPassworderror(true)
            setPassworderrormsg("Enter Password");
            setbutton(true);
        }
    }

    // is to handle password
    const handlepassword = (event) => {
        const value = event.target.value
        if (handleValidation(value)) {
            setbutton(false);
        };
        setPassword(event.target.value);


    }

    // is to handle password validation
    const handleValidation = (value) => {
        // Check length
        if (value.length < 8) {
            setPassworderror(true)
            setPassworderrormsg("Password must be at least 8 characters long.");
            return false;
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
            setPassworderror(true)
            setPassworderrormsg("Password must contain at least one uppercase letter.");
            return false;
        }

        // Check for at least one special character
        if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(value)) {
            setPassworderror(true)
            setPassworderrormsg("Password must contain at least one special character.");
            return false;
        }

        // If all conditions are met, clear error message

        setPassworderrormsg("");
        setPassworderror(false);
        return true;
    };



    //is to handle name null
    function handlenamenull() {
        if (name == '') {
            setnameerror(true);
            setnamerrormsg('Enter name')
            return
        }
        setnameerror(false);
        setnamerrormsg('')
    }

    function nextcomp(e) {
        e.preventDefault();
        if (email === '' && password === '' && name === '') {
            //console.log('enter all details')
            setEmailerror(true);
            setEmailerrormsg('Enter Email')
            setPassworderror(true);
            setPassworderrormsg('Enter Password')
            setnameerror(true);
            setnamerrormsg('Enter name');
            
            return;
        }
        setnext(false);
        

    }

    function backcomp() {

        setnext(true);
        setnewseedphase(null);
        setEmail('');
        setname('');
        setPassword('');
    }

    //this function is to generate seedphase
    function generatewallet() {
        const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
        setnewseedphase(mnemonic)
        settool(false);
    }

    //this is to open wallet
    async function opennewwallet(e) {
        e.preventDefault();
        if (newseedphase == null) {
            settool(true);
            return;
        }
        
        //setwallet(ethers.Wallet.fromPhrase(newseedphase).address)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            //console.log(user);
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    name: name,
                    seedPhrase: newseedphase,
                    favourite: favourite,
                    dashboard: dashboard,
                    uid : user.uid

                });
            }
            setUserData({ name: name, email:email, uid:user.uid, exits:true });
           // console.log("user Registered succesfully")
            setsnack(true);
            setsnackmsg('User Registered Succesfullt');
            setseverity('success');

        } catch (error) {
            //console.log(error.message)
            setsnack(true);
            setsnackmsg(error.message);
            setseverity('error');

        }
    }

    useEffect(()=>{
        setEmail('')
        setname('')
        setPassword('')
    },[])








    return (
        
        <div>

            {next ?
                <div id="register_form" className="container-fluid">

                    <Paper id="registartion_paper" square={false} className="p-2 pt-3" elevation={3}>

                        <Chip className="fs-6" icon={<WalletIcon />} size="large" label="create Wallet" color="primary" />
                        <TextField
                            className="mt-3"
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
                            className="mt-3"
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
                        <TextField
                            className="mt-3 "
                            id="name"
                            name="name"
                            label="Name"
                            size="small"
                            fullWidth
                            variant="outlined"
                            required
                            onChange={(event) => setname(event.target.value)}
                            onBlur={handlenamenull}
                            error={nameerror} // Use error prop to conditionally display error state
                            helperText={namerrormsg} // Helper text to display error message
                        />


                        <div id='regiater_btn_registercomponent_div' className="mt-3">
                            <button onClick={nextcomp} id="regiater_btn_registercomponent"><ArrowRightIcon fontSize="large" />Next </button>
                        </div>

                    </Paper>
                    <div id="already_have_account" className='d-flex justify-content-center align-items-center'>
                        <Link to="/login"><a>Already have an Account?</a></Link>
                    </div>
                    </div>
                :
                
                <div><AnimatedPage>

                    <div id='seedphase_generator' >
                        <Snackbar id='snack_bar'
                         open={snack} 
                         autoHideDuration={1900}
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
                                sx={{ width: '100%' }}
                            >
                                {snackmsg}
                            </Alert>
                            
                        </Snackbar>
                        <Alert className='text-warning' id='alert' severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            Once you generate the seed phrase, save it securely in
                            order to recover your wallet in the future.
                        </Alert>
                        <button className='mt-4 btn btn-primary w-100 fw-bold' onClick={generatewallet}>
                            <Tooltip open={tool} title="please Generate Seed Phrase" placement="top-start"></Tooltip>
                            Generate Seed Phrase
                        </button>

                        <Box
                            id="seedphasebox"
                            height={140}
                            width={300}
                            my={3}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            gap={3}
                            p={2}

                            sx={{ border: '1px solid rgb(189, 195, 199)', borderRadius: '5px' }}
                        >
                            {newseedphase}


                        </Box>

                    </div >
                    <div className='d-flex justify-content-between align-items-center '>

                        <button id='new_wallet' className='mt-2 w-100 p-1 ' onClick={opennewwallet}>Open your New Wallet</button>
                    </div>
                    <button id='back_btn' className='mt-4 btn btn-outline-info' onClick={backcomp} ><ArrowLeftIcon fontSize="medium" />Back</button>
                    </AnimatedPage>
                    </div>
                
            }
        </div>
        
    );
}