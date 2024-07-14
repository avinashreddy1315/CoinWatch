import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');
    const [data, setData] = useState({})
    const [dashchange, setDashchange] = useState([])


    const fetchuserdetails = async (uid) =>{
        const userDocRef = doc(db, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);
        setData(userDocSnapshot.data())
        
        console.log(userDocSnapshot.data())
    }

    useEffect(()=>{
        
        console.log(userId)

        if(userId){
            fetchuserdetails(userId)
            //updateuserdetails(dashchange)
            //setDashchange(data.dashchange)
        }
        console.log(dashchange);
        //fetchuserdetails(userId)
        
        
    },[userId])


    


    

    

    return (
        <UserContext.Provider value={{ userData, setUserData, userId, setUserId, data, setData}}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => useContext(UserContext);