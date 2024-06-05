import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import VictorHomePage from "../../assets/VictorHomePage.png";
import "./TriviumGPT.css";
import { db, auth } from "../../App";
import {
  ChatContainer,
  InputToolbox,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
  updateDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";

import TrashImg from "../../assets/trash-can.png";
import PencilImg from "../../assets/pencil.png";
import ModalEdit from "./ModalEdit";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_REACT_API_GPT_KEY;

function TriviumGPT(props) {
  const [typing, setTyping] = useState(false);
  const [user, setUser] = useState(false);
  const [userObj, setUserObj] = useState();
  const [listening, setListening] = useState(false);
  const [notCompatible, setNotCompatible] = useState();
  const [iconstate, setIcon] = useState("square");
  const [messagePaused, setMessagePaused] = useState();
  const [salute, setSalute] = useState();
  const [context, setContext] = useState();
  const [img, setImg] = useState();
  const [sidechat, setSideChat] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [modal, setModal] = useState(false);
  const [systemPai, setSystemPai] = useState();
  const [salutePai, setSalutePai] = useState();
  const [indiceState, setIndiceState] = useState();
  const [messages, setMessages] = useState([
    {
      message: salute,
      sender: "ChatGPT",
    },
  ]); //Array de mensagens

  const navigate = useNavigate();

  function openModal(indice) {
    setIndiceState(indice);
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  function updateSaluteAndContext(newSalute, newContext) {
    setSalute(newSalute);
    setContext(newContext);

    setMessages([
      {
        message: `${newSalute}`,
        sender: "ChatGPT",
      },
    ]);
    console.log(messages);
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        setUser(true);
        getUserData();

        console.log("setou true");
      } else {
        setUser(false);
      }
    });
  }, []);

  async function getUserData() {
    const userRef = doc(db, "usuarios", auth.currentUser.uid);
    const userData = await getDoc(userRef);

    if (userData.exists()) {
      const lastChat = userData.data().chats.length - 1;
      const initialSalute = userData.data().chats[lastChat].salute;
      const system = userData.data().chats[lastChat].context;
      const imgUrl = userData.data().chats[lastChat].img;
      console.log(lastChat);

      console.log("Document data:", userData.data());
      setUserObj(userData.data());
      setContext(system);
      setImg(imgUrl);
      setMessages([
        {
          message: `${initialSalute}`,
          sender: "ChatGPT",
        },
      ]);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function deleteData(indice) {
    const userRef = doc(db, "usuarios", auth.currentUser.uid);
    const auxDataUser = await getDoc(userRef);
    const dataUser = auxDataUser.data();
    const dbPathRef = doc(db, "usuarios", `${auth.currentUser.uid}`);

    const oldArr = dataUser.chats;
    const newArr = [...oldArr.slice(0, indice), ...oldArr.slice(indice + 1)];
    const newChats = { chats: newArr };
    console.log(newChats);
    await setDoc(dbPathRef, newChats, { merge: true });
    setUpdateData("");
    //     .then(
    //   navigate("/TriviumGPT")
    // ); //caminho, documento, merge
  }

  async function editData(salute, context) {
    const userRef = doc(db, "usuarios", auth.currentUser.uid);
    const auxDataUser = await getDoc(userRef);
    const dataUser = auxDataUser.data();
    const dbPathRef = doc(db, "usuarios", `${auth.currentUser.uid}`);

    const oldArr = dataUser.chats;
    const newArr = [
      ...oldArr.slice(0, indiceState),
      {
        context: `${context == "" ? oldArr[indiceState].context : context}`,
        salute: `${salute == "" ? oldArr[indiceState].salute : salute}`,
        img: `${oldArr[indiceState].img}`,
      },
      ...oldArr.slice(indiceState + 1),
    ];
    console.log("hmm");
    console.log(newArr);
    const newChats = { chats: newArr };
    console.log(newChats);
    await setDoc(dbPathRef, newChats, { merge: true }).then(navigate("/"));
    setUpdateData("");
    //     .then(
    //   navigate("/TriviumGPT")
    // ); //caminho, documento, merge
  }

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

  async function talk(message) {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    console.log("teste");
    console.log("talk");
    let msg = new SpeechSynthesisUtterance();
    msg.voice = voices[0];
    msg.rate = 1;
    msg.pitch = 1;
    msg.text = await message;
    msg.lang = "pt-BR";
    synth.speak(msg);
  }

  const handleSend = async (message) => {
    console.log(context);
    setListening(false);
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; //Todas as mensagens + a nova mensagem (spreading).

    //Atualiza o estado da mensagem
    setMessages(newMessages);
    //Victor esta digitando...
    setTyping(true);

    //Processar a mensagem para o ChatGPT (mandar e ver a resposta)
    SpeechRecognition.stopListening();
    resetTranscript();
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // <-- Recebe um array como parametro

    //chatMessages {sender: "user" or "ChatGPT", message: "conteudo da mensagem aqui" } <-- Objeto das mensagens no chat
    //apiMessage { role: "user" or "assistant", content: "conteudo da mensagem aqui" } <-- Objeto da mensagem na Api

    let apiMessages = chatMessages.map((messageObject) => {
      // <-- Traduz o objeto do chat para os moldes da API
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }; // <-- Retorna este objeto para a variavel apiMessages
    });

    //role: "user" -> Mensagens do usuario, assistant - > Resposta do chat

    //"system" -> uma mensagem inicial para como o chatgpt deve falar
    const systemMessage = {
      role: "system",
      content: `${context}`,
    };
    console.log(context);

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    console.log(apiRequestBody);

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);

        setMessages([
          ...chatMessages,
          { message: data.choices[0].message.content, sender: "ChatGPT" },
        ]);
        console.log(messages);
        console.log();
        setTyping(false);
        return data.choices[0].message.content;
      })
      .then(async (message) => {
        console.log("hmmm");
        await talk(message);
      });
  }
  // Sessão de reconhecimento de fala:
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <div id="MainContainer">
      {modal ? (
        <ModalEdit
          systemPai={systemPai}
          salutePai={salutePai}
          closeModal={closeModal}
          editData={editData}
        />
      ) : (
        ""
      )}
      <div
        id="MainSirioContainer"
        // style={{ position: "relative", height: "900px", width: "1000px" }}
      >
        <div id="sideChatsMainContainer">
          {window.innerWidth < 960 ? (
            <div
              style={{
                display: "flex",
                position: "fixed",
                right: "0px",
                zIndex: "999",
              }}
            >
              <button
                onClick={() => {
                  setSideChat(!sidechat);
                }}
                className="sideChatButtonMobile"
              >{`<`}</button>
              {sidechat ? (
                <InfiniteScroll
                  endMessage={<p>Fim :)</p>}
                  dataLength={userObj.chats.length}
                  height={"80vh"}
                  style={{
                    paddingLeft: "15px",
                    backgroundColor: "rgb(225, 243, 248)",
                    minWidth: "80vw",
                  }}
                >
                  {" "}
                  {userObj.chats.map((x, i) => {
                    if (true)
                      return (
                        <div style={{ cursor: "pointer" }}>
                          <div className="cardSideChatsMainContainer">
                            <div
                              onClick={() => {
                                updateSaluteAndContext(
                                  userObj.chats[i].salute,
                                  userObj.chats[i].context
                                );
                                setSideChat(false);
                              }}
                              className="saudadeStyledComponents"
                            >
                              <div className="imgSideChatContainer">
                                <img
                                  style={{ borderRadius: "50%", width: "100%" }}
                                  src={userObj.chats[i].img}
                                  alt=""
                                />
                              </div>
                              <div className="cardSideChats">
                                <p>{userObj.chats[i].salute}</p>
                              </div>
                            </div>
                            <img className="manoSeiLa" src={TrashImg} alt="" />
                          </div>

                          <hr style={{ color: "rgb(153, 197, 210)" }} />
                        </div>
                      );
                  })}
                </InfiniteScroll>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          {userObj ? (
            <InfiniteScroll
              endMessage={<p>Fim :)</p>}
              dataLength={userObj.chats.length}
              height={"90vh"}
            >
              {" "}
              {userObj.chats.map((x, i) => {
                if (true)
                  return (
                    <div
                      className={`rowside ${
                        clickedIndexes.includes(i) ? "clicked" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="cardSideChatsMainContainer">
                        <div
                          onClick={() => {
                            updateSaluteAndContext(
                              userObj.chats[i].salute,
                              userObj.chats[i].context
                            );
                          }}
                          className="saudadeStyledComponents"
                        >
                          <div className="imgSideChatContainer">
                            <img
                              width={"100%"}
                              style={{ borderRadius: "50%" }}
                              src={userObj.chats[i].img}
                              alt=""
                            />
                          </div>
                          <div className="cardSideChats">
                            <p>{userObj.chats[i].salute}</p>
                          </div>
                        </div>
                        <img
                          onClick={() => {
                            let indice = i;
                            console.log("bola");
                            openModal(indice);
                            setSalutePai(userObj.chats[indice].salute);
                            setSystemPai(userObj.chats[indice].context);
                          }}
                          src={PencilImg}
                          alt=""
                        />

                        <img
                          className="manoSeila"
                          onClick={() => {
                            const updatedIndexes = [...clickedIndexes];
                            updatedIndexes.push(i);
                            setClickedIndexes(updatedIndexes);
                            const indice = i;
                            console.log(indice);
                            deleteData(indice);
                          }}
                          src={TrashImg}
                          alt=""
                        />
                      </div>
                      <hr />
                    </div>
                  );
              })}
            </InfiniteScroll>
          ) : (
            "Erro ao carregar chats antigos"
          )}
        </div>

        <MainContainer>
          <ChatContainer id="SirioContainer">
            <MessageList
              id="MessagesContainer"
              scrollBehavior="smooth"
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Prof. Victor está digitando" />
                ) : null
              }
            >
              {userObj
                ? //isso aqui tem que ser async
                  messages.map((message, i) => {
                    if (messages[i].sender === "ChatGPT") {
                      return (
                        <div id="SirioMessage">
                          <div
                            style={{
                              backgroundColor: "#113C4F",
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              marginRight: "10px  ",
                            }}
                          >
                            <img src={img} alt="" />
                          </div>
                          <Message
                            className="MessagesContainers"
                            key={i}
                            model={message}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <Message
                          className="MessagesContainers"
                          key={i}
                          model={message}
                        />
                      );
                    }
                  })
                : null}
            </MessageList>
            {/* {listening ? ( */}
            <MessageInput
              // sendButton={false}
              sendDisabled={listening ? false : undefined}
              value={listening ? transcript : undefined}
              placeholder="Escreva sua mensagem aqui..."
              onSend={(message) => {
                listening ? handleSend(transcript) : handleSend(message);

                // SpeechRecognition.stopListening();
              }}
            ></MessageInput>
            {/* ) : (
              <MessageInput
                //
                placeholder="Escreva sua mensagem aqui..."
                onSend={handleSend}
              ></MessageInput>
            )} */}
            <InputToolbox>
              {/* <SendButton /> */}
              {/* teste */}
              <div>
                <button
                  className="toolBox-buttons"
                  onClick={() => {
                    if (!listening) {
                      resetTranscript();
                      SpeechRecognition.startListening({
                        continuous: true,
                        language: "pt-BR",
                      });
                      if (!browserSupportsSpeechRecognition) {
                        alert(
                          "Seu navegador não é compativel com o Reconhecimento de fala!"
                        );
                      }
                      setListening(true);
                      // setIcon("square");
                    } else {
                      SpeechRecognition.stopListening();
                      setListening(false);
                    }
                  }}
                >
                  <box-icon
                    color="#113C4F"
                    type="solid"
                    name="microphone"
                    style={listening ? { backgroundColor: "#113C4F" } : {}}
                  ></box-icon>
                </button>
              </div>{" "}
            </InputToolbox>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default TriviumGPT;
