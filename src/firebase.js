import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBX4utxF-dcKWgBbqBFF03axGQSAVAwdVE",
    authDomain: "rookas-amzon-app.firebaseapp.com",
    projectId: "rookas-amzon-app",
    storageBucket: "rookas-amzon-app.appspot.com",
    messagingSenderId: "888978066740",
    appId: "1:888978066740:web:bac580c65959d46c2de961",
    measurementId: "G-GPQ1CZ18QR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;






