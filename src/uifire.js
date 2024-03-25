import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyCTeUwodnOmQb0o9GGRxWPJHtxkklfpxhs",
    authDomain: "wellnus-47b5c.firebaseapp.com",
    projectId: "wellnus-47b5c",
    storageBucket: "wellnus-47b5c.appspot.com",
    messagingSenderId: "1072150455106",
    appId: "1:1072150455106:web:e3c7dc1716516bdcd39edb",
    measurementId: "G-Z2Q31NCZE6"
  };
  
firebase.initializeApp(firebaseConfig);

export default firebase;