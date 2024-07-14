import { useState } from "react"
import google from '../images/google.png';
import { GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, linkWithCredential, reauthenticateWithCredential, sendEmailVerification } from "firebase/auth";
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ethers } from 'ethers';
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../cutom components and hooks/userprovider";
import { OAuthProvider } from "firebase/auth";
import { Co2Sharp } from "@mui/icons-material";
import { EmailAuthProvider } from "firebase/auth";





export default function OtherSignInMethods() {

    let navigate = useNavigate();
    const[password, setPassword] = useState('');
    const [dashboard, setdashboard] = useState(["Rank", "Coin", "Price"]);
    

    const [otherlogin, setotherlogin] = useState({
        'Google': google,
    })

    const { userData, setUserData } = useUser();

    function handleOtherLogin(key) {
        if (key == 'Google') {
            googleLogin();
            return;
        }

    }


    async function googleLogin() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const userExists = await checkIfUserExists(result.user.uid);
            setUserData({ name: result.user.displayName, email: result.user.email, uid: result.user.uid, exits: userExists});
            //console.log(userExists);
            if (!userExists) {
                // Set default values for a new user
                await setDoc(doc(db, "users", result.user.uid), {
                    email: result.user.email,
                    name: result.user.displayName,
                    favourite: [],
                    dashboard: dashboard,
                    uid: result.user.uid
                });
            }

            //console.log(`name:- ${result.user.displayName}, email:- ${result.user.email}, uid:-${result.user.uid}`);
            
           
            //console.log(`name: ${result.user.displayName}, email: ${result.user.email}, uid: ${result.user.uid}, exits: ${userExists}`)
            navigate('/wallet')

        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    }






    async function checkIfUserExists(userId) {
        try {
            //console.log(typeof (userId), userId)
            // Reference to the user's document in the Firestore collection
            const userDocRef = doc(db, 'users', userId);

            // Fetch the user's document from Firestore
            const userDocSnapshot = await getDoc(userDocRef);
            //console.log(userDocSnapshot.data());
            //console.log(userDocSnapshot.exists())

            // Check if the user's document exists in the snapshot
            if (userDocSnapshot.exists()) {
                // User exists in the Firestore collection
               // console.log('true');
                return true;
            } else {
                // User does not exist in the Firestore collection
                //console.log('false');
                return false;
            }
        } catch (error) {
            console.error('Error checking if user exists:', error);
            // Handle error (e.g., display error message to the user)
            throw error;
        }
    }



    return (
        <div id="otherlogin">

            {Object.entries(otherlogin).map(([key, value]) => (
                <button key={key} value={key} className="otherlogin_logo_div d-flex justify-content-center align-items-center" onClick={() => handleOtherLogin(key)}>
                    <img className="otherlogin_logo me-3" src={value} alt={key} />
                    <span className=""> SignIn with {key}</span>
                </button>
            ))}


        </div>
    );
}



