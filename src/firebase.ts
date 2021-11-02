// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import {getFunctions, httpsCallable} from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6EdTGfDnNdeRuwLCoVQgN-3Uj1WBNhDo",
    authDomain: "tolypash0.firebaseapp.com",
    databaseURL: "https://tolypash0-default-rtdb.firebaseio.com",
    projectId: "tolypash0",
    storageBucket: "tolypash0.appspot.com",
    messagingSenderId: "377483959376",
    appId: "1:377483959376:web:9691c2cb3ae14202e28555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const functions = getFunctions(app)

export { db, functions,  httpsCallable };