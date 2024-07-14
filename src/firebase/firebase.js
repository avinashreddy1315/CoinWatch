// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv9T6iVqKdvCYiq71tRKaBue2U842Yvno",
  authDomain: "cryptowatch1315.firebaseapp.com",
  projectId: "cryptowatch1315",
  storageBucket: "cryptowatch1315.appspot.com",
  messagingSenderId: "1080683782147",
  appId: "1:1080683782147:web:5cb9ddb2db609d6837ee36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;