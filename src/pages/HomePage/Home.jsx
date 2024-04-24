import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fundohome from "../../assets/fundohome.png";
import logopng from "../../assets/logo personai png.png";

import "./Home.css";
import { db } from "../../App";

const MainContainer = styled.div`
  height: 100vh;
`;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
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
      <HomeContainer>
        <HomeImg src={logopng} />
        <HomeTextContainer>
          <HomeTitle>Crie um persona em segundos.</HomeTitle>
          <HomeText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
            quia? Ut, sapiente nesciunt ratione delectus quisquam non facilis
            blanditiis inventore temporibus perferendis reiciendis consequuntur
            quasi corporis nisi quas. Ut, nemo. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Magnam, quia? Ut, sapiente nesciunt
            ratione delectus quisquam non facilis blanditiis inventore
            temporibus perferendis reiciendis consequuntur quasi corporis nisi
            quas. Ut, nemo.
          </HomeText>
        </HomeTextContainer>
      </HomeContainer>
    </MainContainer>
  );
}

export default Home;
