// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtOGbwG7qLXDvH1PiUMTkplEqZij00cPo",
  authDomain: "todolist-33941.firebaseapp.com",
  projectId: "todolist-33941",
  storageBucket: "todolist-33941.appspot.com",
  messagingSenderId: "984798227029",
  appId: "1:984798227029:web:8e669adced36f8ccdc02dc",
  measurementId: "G-1TX8GK25R3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);