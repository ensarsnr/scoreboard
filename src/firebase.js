// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBq1iCNQW131_ep9-4yzZKn3wSEufTomI",
  authDomain: "rodeo-app-28d2f.firebaseapp.com",
  projectId: "rodeo-app-28d2f",
  storageBucket: "rodeo-app-28d2f.appspot.com",
  messagingSenderId: "521310414828",
  appId: "1:521310414828:web:5551276580ff68269702c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);