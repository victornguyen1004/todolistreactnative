import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkTvSBuc_LbCakkAxv8PaqqDhlQL7RuGw",
  authDomain: "todolist-da0ea.firebaseapp.com",
  projectId: "todolist-da0ea",
  storageBucket: "todolist-da0ea.appspot.com",
  messagingSenderId: "748422319124",
  appId: "1:748422319124:web:25618dce8f0e2609826b01",
  measurementId: "G-Y860DN197T",
};


let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}


export { app, firebase };
