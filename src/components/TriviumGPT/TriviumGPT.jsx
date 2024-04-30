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

import { doc, getDoc } from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [sidechat, setSideChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: salute,
      sender: "ChatGPT",
    },
  ]); //Array de mensagens

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
      console.log(lastChat);

      console.log("Document data:", userData.data());
      setUserObj(userData.data());
      setContext(system);
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
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            updateSaluteAndContext(
                              userObj.chats[i].salute,
                              userObj.chats[i].context
                            );
                            setSideChat(false);
                          }}
                        >
                          <div className="cardSideChatsMainContainer">
                            <div className="imgSideChatContainer"></div>
                            <div className="cardSideChats">
                              <p>{userObj.chats[i].salute}</p>
                            </div>
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
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        updateSaluteAndContext(
                          userObj.chats[i].salute,
                          userObj.chats[i].context
                        );
                      }}
                    >
                      <div className="cardSideChatsMainContainer">
                        <div className="imgSideChatContainer"></div>
                        <div className="cardSideChats">
                          <p>{userObj.chats[i].salute}</p>
                        </div>
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
                            <img src={""} alt="" />
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
