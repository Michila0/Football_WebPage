// import * as firebase from 'firebase/app';
// import 'firebase/auth';
//
// const firebaseConfig = {
//     apiKey: "AIzaSyDfNNpeprMlgC44FuRM6tD9P9SBjkmg5E4",
//     authDomain: "mcity-f05af.firebaseapp.com",
//     projectId: "mcity-f05af",
//     storageBucket: "mcity-f05af.appspot.com",
//     messagingSenderId: "522678571401",
//     appId: "1:522678571401:web:fd24a5a6f4766776379158",
//     measurementId: "G-7QLKGVW2JX"
// };
//
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
//
// export {
//     firebase
// }






//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
//export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);









