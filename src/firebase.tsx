import * as firebase from 'firebase/app';
import 'firebase/auth';

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
firebase.initializeApp(firebaseConfig);

export {
    firebase
}