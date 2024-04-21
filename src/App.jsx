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
  appId: "1:584350673997:web:456c55ecc6ceabc718c004"
};

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import BotCreation from "./pages/BotCreation/BotCreation";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/TriviumGPT" element={<TriviumGPT />}></Route>
          <Route path="/BotCreation" element={<BotCreation />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
