import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import googleIcon from "../assets/googleico.svg";
import facebookIcon from "../assets/facebookicon.svg";
import { useState } from "react";
import { auth } from "../App";
import { signInWithEmailAndPassword } from "firebase/auth";

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40rem;
  height: 40rem;
  background-color: #e6f1f5;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media screen and (max-width: 960px) {
    width: 80%;
    height: 70%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const FormInput = styled.input`
  height: 2rem;
  border-radius: 0.5rem;
  color: #113c4f;
  padding: 0.5rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    outline-color: #2b8fb9;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: 50%;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
  margin-top: 0.5rem;
`;
const FormButton = styled.button`
  margin: 1rem 0rem;
  background-color: #113c4f;
  color: #fff;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

const BtnFacebook = styled.button`
  display: flex !important;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 35px;
  border-radius: 4px;
  background: #3b5998;
  color: white;
  border: 0px transparent;
  text-align: center;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
  &:hover {
    background: #3b5998;
    opacity: 0.9;
  }
`;
const BtnGoogle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 5px;
  cursor: pointer;
  width: 100%;
  height: 35px;
  border-radius: 4px;
  background: #db3236;
  color: white;
  border: 0px transparent;
  text-align: center;

  &:hover {
    background: #db3236;
    opacity: 0.9;
  }
`;

function LoginForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <FormArea>
      <h3 style={{ textAlign: "center" }}>Realizar Log In</h3>
      <FormLabel>Email</FormLabel>
      <FormInput
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(email);
        }}
        value={email}
        placeholder="Digite seu email"
      />
      <FormLabel>Senha</FormLabel>
      <FormInput
        onChange={(e) => {
          setSenha(e.target.value);
          console.log(senha);
        }}
        value={senha}
        type="password"
        placeholder="Digite sua senha"
      />
      <FormButton
        onClick={(e) => {
          e.preventDefault();
          props.handleSignin(email, senha);
        }}
      >
        Entrar
      </FormButton>
      <p style={{ textAlign: "center" }}>ou</p>
      <BtnFacebook
        onClick={(e) => {
          e.preventDefault();
          props.handlelogin("facebook");
        }}
      >
        <img
          src={facebookIcon}
          alt="A facebook logo icon in pixel perfect"
          width={30}
          height={30}
        />
        Sign In with Facebook
      </BtnFacebook>
      <BtnGoogle
        onClick={(e) => {
          e.preventDefault();
          props.handlelogin("google");
        }}
      >
        <img
          src={googleIcon}
          alt="A google logo icon in pixel perfect"
          width={20}
          height={20}
        />
        Sign In with Google
      </BtnGoogle>
      <span
        onClick={() => navigate("/NewUser")}
        style={{
          textAlign: "center",
          marginTop: "0.3rem",
          color: "#0000EE",
          cursor: "pointer",
        }}
      >
        Não possui conta? Crie uma agora.
      </span>
    </FormArea>
  );
}

export default LoginForm;
