import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD-R1tGQDBAbyBBPgNITIlTcSEisXfWPyY",
    authDomain: "jobbcentralen-b1899.firebaseapp.com",
    projectId: "jobbcentralen-b1899",
    storageBucket: "jobbcentralen-b1899.appspot.com",
    messagingSenderId: "313421372250",
    appId: "1:313421372250:web:bcd94b8959bd6ed44d7163",
    measurementId: "G-3GK4SXCD9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
