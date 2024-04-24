import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fundohome from "../../assets/fundohome.png";
import logopng from "../../assets/logo personai png.png";

import "./Home.css";
import { db } from "../../App";
import Svg from "../../components/Svg";

const MainContainer = styled.div`
  overflow: hidden;
  height: 100vh;
`;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  /* background-image: url(${fundohome}); */
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;
  overflow: hidden;
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
const HomeImg = styled.img`
  width: 40%;
  margin-bottom: 100px;
  animation: floating 2s infinite alternate-reverse ease-in-out;
  @keyframes floating {
    0% {
      transform: translatey(0);
    }
    100% {
      transform: translatey(30px);
    }
  }
`;

function Home() {
  const pages = [{ id: 0, imgsrc: "link", title: "", content: "" }, "tipPage"];

  return (
    <MainContainer>
      <Svg></Svg>
      <HomeContainer>
        <HomeImg src={logopng} />
        <HomeTextContainer>
          <HomeTitle>Crie um persona em segundos.</HomeTitle>
          <HomeText>
            O PersonaAI é um projeto de inteligência artificial que cria
            personas em segundos para fornecer conselhos e ajudar em uma ampla
            variedade de problemas. Combinando aprendizado de máquina e
            compreensão da linguagem natural, ele oferece assistência
            personalizada em tempo real para desafios como orientação de
            carreira e sugestões de estilo de vida saudável. Experimente o
            PersonaAI hoje para obter insights valiosos e orientação
            personalizada sempre que precisar!
          </HomeText>
        </HomeTextContainer>
      </HomeContainer>
    </MainContainer>
  );
}

export default Home;
