import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fundohome from "../../assets/fundohome.png";
import logopng from "../../assets/logo personai png.png";
import logonav from "../../assets/logonav.png";
import "./Home.css";

const MainContainer = styled.div`
height: 100vh;
`

const Navbar = styled.div`
width: 100%;
height: 80px;
background-color: #113C4F;
display: flex;
justify-content: space-between;
align-items: center;
`
const LoginButton = styled.button`
width: 100px;
background-color: white;
border-radius: 10px;
height: 50px;
border: none;
margin-right: 100px;
&:hover{
  cursor:pointer;
}

`
const NavbarLogo = styled.img`
height: 100%;

&:hover{
  cursor: pointer;
}
`

const HomeContainer = styled.div`
  display:flex;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  background-image: url(${fundohome});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;

`
const HomeTextContainer = styled.div`
max-width: 40%;
width:100%;
`
const HomeTitle = styled.h1`
color:#113C4F;
font-size: 35px;
margin-bottom: 20px;
`
const HomeText = styled.p`
color: #30A0BF;
font-size: 20px;
margin-bottom: 100px;
`
const HomeImg = styled.img`
  width: 40%;
  margin-bottom: 100px;
`



function Home() {
  const pages = [{ id: 0, imgsrc: "link", title: "", content: "" }, "tipPage"];
  const [currentPage, setCurrentPage] = useState("homePage");
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Navbar>
        <NavbarLogo onClick={()=>{ navigate("/")}} src={logonav}></NavbarLogo>
        <LoginButton onClick={()=>{ navigate("/BotCreation")}}>Login</LoginButton>
      </Navbar>
      <HomeContainer>
      <HomeImg src={logopng}/>
        <HomeTextContainer>
          <HomeTitle>Crie um persona em segundos.</HomeTitle>  
          <HomeText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, quia? Ut, sapiente nesciunt ratione delectus quisquam non facilis blanditiis inventore temporibus perferendis reiciendis consequuntur quasi corporis nisi quas. Ut, nemo.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, quia? Ut, sapiente nesciunt ratione delectus quisquam non facilis blanditiis inventore temporibus perferendis reiciendis consequuntur quasi corporis nisi quas. Ut, nemo.

          </HomeText>
        </HomeTextContainer>
      </HomeContainer>
    </MainContainer>
  );
}

export default Home;
