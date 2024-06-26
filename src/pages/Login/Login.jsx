import React, { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";

import { auth, db } from "../../App";
import { updateProfile } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  function handleSignin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: "teste",
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  function handleLogin(authenticator) {
    const provider =
      authenticator == "facebook"
        ? new FacebookAuthProvider()
        : authenticator == "google"
        ? new GoogleAuthProvider()
        : "";
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        const token = credential.accessToken;
        // The signed-in user info.
        const userJson = result.user;
        // console.log(user);
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
  //   handleLogin();
  const [user, setUser] = useState(false);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  async function addData() {
    const docData = {
      name: auth.currentUser.displayName,
    };
    const dbPathRef = doc(db, "usuarios", auth.currentUser.uid);
    console.log(dbPathRef ? true : false);
    await setDoc(dbPathRef, docData, { merge: true }); //caminho, documento, merge
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        addData();
        navigate("/");
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
      }}
    >
      {user ? (
        "Logado"
      ) : (
        <LoginForm handleSignin={handleSignin} handlelogin={handleLogin} />
      )}
    </div>
  );
};

export default Login;
