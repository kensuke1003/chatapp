
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/';


//////////////////////////////////////////////////////////////////////

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAcs3MpZjWk37riVD4r-AoS83eLCPUAfkw",
  authDomain: "chatapp-194f6.firebaseapp.com",
  databaseURL: "https://chatapp-194f6.firebaseio.com",
  projectId: "chatapp-194f6",
  storageBucket: "chatapp-194f6.appspot.com",
  messagingSenderId: "753591650112",
  appId: "1:753591650112:web:9651f2b9c042a6400edca5",
  measurementId: "G-Z7HQHM8352"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


////////////////////////////////////////////////////////////////////// firebaseのscript内からコピぺ

export const auth = firebase.auth();
export const db = firebase.firestore();

