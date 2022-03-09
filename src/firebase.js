// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrqO48w_qJ-iP7MDOshtRcVI3on5SA31Q",
    authDomain: "books-wishlists.firebaseapp.com",
    projectId: "books-wishlists",
    storageBucket: "books-wishlists.appspot.com",
    messagingSenderId: "437707552540",
    appId: "1:437707552540:web:fbfaa3747cb9255a896cd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();