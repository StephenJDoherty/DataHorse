import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACvSgz1IHnPd8c_40OICvzaGDSWCkq6ec",
  authDomain: "helth-76a0e.firebaseapp.com",
  projectId: "helth-76a0e",
  storageBucket: "helth-76a0e.appspot.com",
  messagingSenderId: "1024570658775",
  appId: "1:1024570658775:web:d77a57895879e53b54c592",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
