import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbVSHc_gbDTZYOzpAVHsJph4a_70QJoCc",
    authDomain: "mymoney-a304a.firebaseapp.com",
    projectId: "mymoney-a304a",
    storageBucket: "mymoney-a304a.appspot.com",
    messagingSenderId: "85742989496",
    appId: "1:85742989496:web:a3c3c71f882c463f6a844d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// calling each required services and storing it in a variable
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

// exporting the services object returned above for using it in other files.
export { projectFirestore, projectAuth, timestamp };
