import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database';
import { getFunctions, httpsCallable } from 'firebase/functions';

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
const dbRef = (path: string) => ref(db, path)

const functions = getFunctions(app)
const fireFunction = (name: string) => httpsCallable(functions, name)

export { functions, fireFunction, dbRef };