import React, { useEffect, useState } from "react";

import { auth, db } from "../../App";
import { provider } from "../../App";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
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
      name: auth.currentUser.displayName + "bla",
      adm: false,
      chats: [],
    };

    const dbPathRef = doc(db, "usuarios", auth.currentUser.uid);
    console.log(dbPathRef ? true : false);
    await setDoc(dbPathRef, docData); //caminho, documento, merge
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        addData();
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div>
      <button onClick={user ? handleLogout : handleLogin}>
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Login;
