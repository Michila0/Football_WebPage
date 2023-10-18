//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import 'firebase/firestore';
//import firebase from "firebase/compat";
import {addDoc, collection, getFirestore } from "firebase/firestore";

import { cityDb } from '../temp/m-city-export.tsx';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfNNpeprMlgC44FuRM6tD9P9SBjkmg5E4",
    authDomain: "mcity-f05af.firebaseapp.com",
    projectId: "mcity-f05af",
    storageBucket: "mcity-f05af.appspot.com",
    messagingSenderId: "522678571401",
    appId: "1:522678571401:web:fd24a5a6f4766776379158",
    measurementId: "G-7QLKGVW2JX"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
//firestore Collection
export const matchesCollection = collection(db, 'matches')
export const playersCollection = collection(db, 'players')
export const positionsCollection = collection(db, 'positions')
export const promotionsCollection = collection(db, 'promotions')
export const teamsCollection = collection(db, 'teams')


//import the data
// cityDb.matches.forEach(async item => await addDoc(matchesCollection,item))
//cityDb.players.forEach(async item => await addDoc(playersCollection,item))
//cityDb.positions.forEach(async item => await addDoc(positionsCollection,item))
//cityDb.promotions.forEach(async item => await addDoc(promotionsCollection,item))
//cityDb.teams.forEach(async item => await addDoc(teamsCollection,item))
