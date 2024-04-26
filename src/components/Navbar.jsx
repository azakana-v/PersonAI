import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logonav from "../assets/logonav.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../App";
import { onAuthStateChanged, signOut } from "firebase/auth";
import defaultUser from "../assets/defaultUser.jpg";

const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #113c4f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  /* position: absolute; */
`;
const NavButtons = styled.div`
  display: flex;
`;

const LoginButton = styled.button`
  width: 100px;
  background-color: white;
  border-radius: 10px;
  height: 50px;
  border: none;
  margin-bottom: 10px;
  /* margin-bottom: 20px; */
  &:hover {
    cursor: pointer;
  }
  &:first-child {
    margin-right: 10px;
  }
`;
const NavbarLogo = styled.img`
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const PerfilCardMainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 100px;
  cursor: pointer;
  /* width: 0px; */
  p {
    white-space: nowrap;
  }
  @media screen and (max-width: 960px) {
    /* margin-right: 0px; */
  }
`;

const PerfilCardContainer = styled.div`
  max-width: 0px;
`;

const PerfilCard = styled.div`
  z-index: 999;
  position: relative;
  min-height: fit-content;
  min-width: fit-content;
  padding: 20px;
  background-color: #74a1b3;
  left: -120px;
  top: 150px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  & :first-child {
  }
  /* animation: teste 0.1s ease-in-out forwards; */
  @keyframes teste {
    0% {
      top: -100px;
    }
    100% {
      top: 115px;
    }
  }
  @media screen and (max-width: 960px) {
    left: -100px;
  }
`;

const BotImg = styled.img`
  background-color: gray;
  width: 100%;
  height: 100%;
  /* margin-bottom: 50px; */
  /* margin-top: 10px; */
  border-radius: 50%;
`;

const BotImageContainer = styled.section`
  position: relative;
  max-width: 50px;
  max-height: 50px;
  min-width: 50px;
  min-height: 50px;
  margin-left: 2px;
  border-radius: 50%;
`;

const Navbar = (props) => {
  const [user, setUser] = useState(false);
  const [screenName, setScreenName] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setScreenName(auth.currentUser.displayName);
      } else {
        setUser(false);
      }
    });
  }, []);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("homePage");
  const [perfilClicked, setPerfilClicked] = useState(false);
  return (
    <NavbarContainer>
      <NavbarLogo
        onClick={() => {
          navigate("/");
          console.log(auth.currentUser);
        }}
        src={logonav}
      ></NavbarLogo>
      <NavButtons>
        {/* <LoginButton
          onClick={() => {
            navigate("/BotCreation");
          }}
        >
          Criar!
        </LoginButton> */}

        <PerfilCardMainContainer
          onClick={() => {
            {
              user ? setPerfilClicked(!perfilClicked) : "";
            }
          }}
        >
          {user ? (
            window.innerWidth > 960 ? (
              <p>{screenName}</p>
            ) : (
              <BotImageContainer>
                <BotImg src={defaultUser} />
              </BotImageContainer>
            )
          ) : (
            " "
          )}
          {perfilClicked ? (
            <PerfilCardContainer>
              <PerfilCard>
                <LoginButton
                  onClick={() => {
                    navigate("/TriviumGPT");
                  }}
                >
                  Meus chats
                </LoginButton>
                <LoginButton
                  onClick={() => {
                    navigate("/BotCreation");
                  }}
                >
                  Criar!
                </LoginButton>
                <LoginButton
                  onClick={() => {
                    {
                      user ? handleLogout() : null;
                    }
                    navigate("/login");
                  }}
                >
                  {user ? "Logout" : "Login"}
                </LoginButton>
              </PerfilCard>
            </PerfilCardContainer>
          ) : user ? (
            ""
          ) : (
            <LoginButton
              onClick={() => {
                navigate("/login");
              }}
            >
              {user ? "Logout" : "Login"}
            </LoginButton>
          )}
        </PerfilCardMainContainer>

        {/* <LoginButton
          onClick={() => {
            {
              user ? handleLogout() : null;
            }
            navigate("/login");
          }}
        >
          {user ? "Logout" : "Login"}
        </LoginButton> */}
      </NavButtons>
    </NavbarContainer>
  );
};

export default Navbar;
