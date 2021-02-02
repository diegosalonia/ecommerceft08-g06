import firebase from "firebase/app";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCrOQFk5Ou4XAa7IwhZVkXsYwGKCYHIXxk",
    authDomain: "un-jardin-especial.firebaseapp.com",
    projectId: "un-jardin-especial",
    storageBucket: "un-jardin-especial.appspot.com",
    messagingSenderId: "609131016095",
    appId: "1:609131016095:web:e6ded501ee3055475d97aa",
    measurementId: "G-2GD4XGJFQN"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default} ;