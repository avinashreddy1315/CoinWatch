import { useState, useEffect } from "react"
import { Snackbar } from "@mui/material"
import { useUser } from "../cutom components and hooks/userprovider";
import { Slide } from "@mui/material";
import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";
import { ethers } from 'ethers';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";


export default function OtherRegistartion() {

    let navigate = useNavigate()

    const [snack, setsnack] = useState(false)
    const [newseedphase, setnewseedphase] = useState(null);
    const [tool, settool] = useState(false);
    const [snackmsg, setsnackmsg] = useState('');
    const [severity, setseverity] = useState('');
    const { userData, setUserData } = useUser();
    const [dashboard, setdashboard] = useState([]);



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
            const user = auth.currentUser;
            //console.log(user);
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    name: user.displayName,
                    seedPhrase: newseedphase,
                    favourite: [],
                    dashboard: dashboard,
                    uid: user.uid
                });
            }
            setUserData({ name: userData.name, email:userData.email, uid:userData.uid, exits:true });
            
            //console.log("user Registered succesfully")
            
            setsnack(true);
            setsnackmsg('User Registered Succesfullt');
            setseverity('success');
            navigate("/wallet");
        } catch (error) {
            //console.log(error.message)
            setsnack(true);
            setsnackmsg(error.message);
            setseverity('error');

        } 
    }

    return (
        <div id="other_signup_seedphase_generator">
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
            </div>
            <div id="new_wallet_btn" className='d-flex justify-content-between align-items-center w-100 mb-2'>
                <button id='new_wallet' className='mt-2 w-100 p-1 ' onClick={opennewwallet}>Open your New Wallet</button>
            </div>
        </div>
    )
}