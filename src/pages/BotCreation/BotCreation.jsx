import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fundohome from "../../assets/fundohome.png";
import logonav from "../../assets/logonav.png";
import TriviumGPT from "../../components/TriviumGPT/TriviumGPT";
import "./BotCreation.css";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApcAIkpakr4l9msYaDxAzD89t9QUz3dl0",
  authDomain: "personai-5d5fc.firebaseapp.com",
  projectId: "personai-5d5fc",
  storageBucket: "personai-5d5fc.appspot.com",
  messagingSenderId: "584350673997",
  appId: "1:584350673997:web:456c55ecc6ceabc718c004",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const MainContainer = styled.div`
  height: 100vh;
`;

const Navbar = styled.div`
  width: 100%;
  height: 80px;
  background-color: #113c4f;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LoginButton = styled.button`
  width: 100px;
  background-color: white;
  border-radius: 10px;
  height: 50px;
  border: none;
  margin-right: 100px;
  &:hover {
    cursor: pointer;
  }
`;
const NavbarLogo = styled.img`
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const MainContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url(${fundohome});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;
`;
const HomeTextContainer = styled.div`
  max-width: 40%;
  width: 100%;
`;
const HomeTitle = styled.h1`
  color: #113c4f;
  font-size: 35px;
  margin-bottom: 20px;
`;
const HomeText = styled.p`
  color: #30a0bf;
  font-size: 20px;
  margin-bottom: 100px;
`;
const BotImg = styled.img`
  background-color: gray;
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
  margin-bottom: 50px;
  margin-top: 10px;
  border-radius: 50%;
`;
const CreateBotContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #e6f1f5;
  height: 70%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-radius: 50px;

  box-shadow: 29px 29px 72px #a8a8a8, -29px -29px 72px #ffffff;
`;

const Salute = styled.input`
  width: 50%;
  margin-bottom: 20px;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: lightgray;
  padding: 5px;
  &:focus {
    outline-color: #2b8fb9;
  }
`;
const Context = styled.textarea`
  width: 80%;
  margin-bottom: 20px;
  border: none;
  height: 300px;
  border-radius: 10px;
  padding: 20px;
  color: lightgray;
  &:focus {
    outline-color: #2b8fb9;
  }
`;
const Logo = styled.img`
  width: 350px;
`;

const CreateButton = styled.button`
  width: 250px;
  height: 50px;
`;

function BotCreation() {
  const pages = [{ id: 0, imgsrc: "link", title: "", content: "" }, "tipPage"];
  const [currentPage, setCurrentPage] = useState("homePage");
  const [created, setCreated] = useState(false);
  const [user, setUser] = useState(false);
  const [saluteMsg, setSaluteMsg] = useState("");
  const [contextConfig, setContextConfig] = useState();
  const navigate = useNavigate();

  async function addData() {
    const docData = {
      uiduser: "",
      adm: false,
      chats: [
        { context: "Ola eu sou o gp", img: "caminhodaimg", salute: "oi" },
      ],
    };

    const dbPathRef = doc(db, "usuarios", "teste");
    await setDoc(dbPathRef, docData, { merge: true }); //caminho, documento, merge
  }

  return (
    <MainContainer>
      {created ? (
        <TriviumGPT context={contextConfig} salute={saluteMsg}></TriviumGPT>
      ) : (
        <MainContentContainer>
          <CreateBotContainer>
            <BotImg></BotImg>
            <Salute
              onChange={(e) => {
                setSaluteMsg(e.target.value);
              }}
              value={saluteMsg}
              placeholder="Digite a mensagem inicial..."
            >
              {}
            </Salute>
            <Context
              onChange={(e) => {
                setContextConfig(e.target.value);
              }}
              value={contextConfig}
              placeholder="Digite o comportamento do assistente..."
            ></Context>
            <Logo src={logonav} />
            <CreateButton
              onClick={() => {
                addData();
                // setCreated(true);
              }}
            >
              Criar!
            </CreateButton>
          </CreateBotContainer>
        </MainContentContainer>
      )}
    </MainContainer>
  );
}

export default BotCreation;
