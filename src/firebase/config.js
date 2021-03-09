import app from 'firebase/app';
import 'firebase/firestore';


  var firebaseConfig = {
    apiKey: "AIzaSyDI0IvXzyJFYSWXQD_Wpv0G_k9qqXiNTc8",
    authDomain: "uae-jobs-2020.firebaseapp.com",
    projectId: "uae-jobs-2020",
    storageBucket: "uae-jobs-2020.appspot.com",
    messagingSenderId: "1037751585023",
    appId: "1:1037751585023:web:b331a3425be80a892424ca"
  };
  
  const firebase = app.initializeApp(firebaseConfig);
  const db = firebase.firestore();


  export {firebase, db, app}
