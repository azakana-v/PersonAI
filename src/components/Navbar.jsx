import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logonav from "../assets/logonav.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../App";
import { onAuthStateChanged } from "firebase/auth";
const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #113c4f;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavButtons = styled.div``;

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

const Navbar = (props) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("homePage");
  return (
    <NavbarContainer>
      <NavbarLogo
        onClick={() => {
          navigate("/");
        }}
        src={logonav}
      ></NavbarLogo>
      <NavButtons>
        <LoginButton
          onClick={() => {
            navigate("/BotCreation");
          }}
        >
          Criar!
        </LoginButton>

        <LoginButton
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </LoginButton>
      </NavButtons>
    </NavbarContainer>
  );
};

export default Navbar;
