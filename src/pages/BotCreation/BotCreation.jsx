import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fundohome from "../../assets/fundohome.png";
import logonav from "../../assets/logonav.png";
import pen from "../../assets/Pen.svg";
import TriviumGPT from "../../components/TriviumGPT/TriviumGPT";
import defaultUser from "../../assets/defaultUser.jpg";
import "./BotCreation.css";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import CreateImageModal from "../../components/CreateImageModal";

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
  @media screen and (max-width: 960px) {
    align-items: start;
    margin-top: 25px;
  }
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
const BotImageContainer = styled.section`
  position: relative;
  max-width: 200px;
  max-height: 200px;

  margin-bottom: 50px;
  margin-top: 10px;
  border-radius: 50%;
  @media screen and (max-width: 960px) {
    min-width: 150px;
    max-width: 150px;
    max-height: 150px;
    max-height: 150px;
    margin-bottom: 20px;
    margin-top: 0px;
  }
`;
const Overlay = styled.div`
  position: absolute;
  margin-top: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  opacity: 0;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    opacity: 1;
  }

  transition: opacity 0.3s ease;
`;
const BotImg = styled.img`
  background-color: gray;
  max-width: 100%;
  max-height: 100%;
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
  @media screen and (max-width: 960px) {
    width: 90%;
    height: auto;
    box-shadow: none;
    justify-content: start;
    /* align-items: center; */
  }
`;

const Salute = styled.input`
  width: 60%;
  margin-bottom: 20px;
  border: none;
  height: 50px;
  border-radius: 10px;

  color: #2b8fb9;
  padding: 1rem;

  &:focus {
    outline-color: #2b8fb9;
  }
  @media screen and (max-width: 960px) {
    padding: 0.3rem;
  }
`;
const Context = styled.textarea`
  width: 60%;
  margin-bottom: 20px;
  border: none;

  border-radius: 10px;

  padding: 2rem;
  color: #2b8fb9;

  &:focus {
    outline-color: #2b8fb9;
  }
  @media screen and (max-width: 960px) {
    padding: 1rem;
  }
`;
const Logo = styled.img`
  width: 350px;
  @media screen and (max-width: 960px) {
    width: 80%;
  }
`;

const CreateButton = styled.button`
  width: 250px;
  height: 50px;
  margin: 1rem 0rem;
  background-color: #113c4f;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
`;

function BotCreation() {
  const pages = [{ id: 0, imgsrc: "link", title: "", content: "" }, "tipPage"];
  const [currentPage, setCurrentPage] = useState("homePage");
  const [created, setCreated] = useState(false);
  const [user, setUser] = useState(false);
  const [saluteMsg, setSaluteMsg] = useState("");
  const [contextConfig, setContextConfig] = useState();
  const [createdImage, setCreatedImage] = useState("");
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setOpenModal(!openModal);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  async function addData() {
    const dataUser = await getUserData();
    const newChats = dataUser.chats
      ? [
          ...dataUser.chats,
          { context: contextConfig, img: "", salute: saluteMsg },
        ]
      : [{ context: contextConfig, img: "", salute: saluteMsg }];
    const newPersona = { chats: newChats };
    const dbPathRef = doc(db, "usuarios", auth.currentUser.uid);
    await setDoc(dbPathRef, newPersona, { merge: true }).then(
      navigate("/TriviumGPT")
    ); //caminho, documento, merge
  }

  async function getUserData() {
    const userRef = doc(db, "usuarios", auth.currentUser.uid);

    const userData = await getDoc(userRef);

    if (userData.exists()) {
      console.log("Document data:", userData.data());
      return userData.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <MainContainer>
      {created ? (
        <TriviumGPT context={contextConfig} salute={saluteMsg}></TriviumGPT>
      ) : (
        <MainContentContainer>
          <CreateBotContainer>
            <BotImageContainer>
              <BotImg src={createdImage ? logonav : defaultUser} />
              <Overlay className="overlay">
                <img src={pen} width={25} height={20} /> Criar avatar
              </Overlay>
            </BotImageContainer>
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
