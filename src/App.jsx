import "boxicons";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "regenerator-runtime/runtime";
import "./App.css";

import TriviumGPT from "./components/TriviumGPT/TriviumGPT";
import Home from "./pages/HomePage/Home";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApcAIkpakr4l9msYaDxAzD89t9QUz3dl0",
  authDomain: "personai-5d5fc.firebaseapp.com",
  projectId: "personai-5d5fc",
  storageBucket: "personai-5d5fc.appspot.com",
  messagingSenderId: "584350673997",
  appId: "1:584350673997:web:456c55ecc6ceabc718c004",
};

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import BotCreation from "./pages/BotCreation/BotCreation";
import Navbar from "./components/Navbar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login/Login";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.useDeviceLanguage();

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid);
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/TriviumGPT" element={<TriviumGPT />}></Route>
          <Route
            path="/BotCreation"
            element={user ? <BotCreation /> : <Login />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
