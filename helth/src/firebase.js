import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyACvSgz1IHnPd8c_40OICvzaGDSWCkq6ec",
  authDomain: "helth-76a0e.firebaseapp.com",
  databaseURL: "https://helth-76a0e-default-rtdb.firebaseio.com",
  projectId: "helth-76a0e",
  storageBucket: "helth-76a0e.appspot.com",
  messagingSenderId: "1024570658775",
  appId: "1:1024570658775:web:d77a57895879e53b54c592",
  measurementId: "G-QR0RTE0FBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

export const auth = getAuth(app);
export default app;
