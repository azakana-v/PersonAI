import styled from "styled-components";
import googleIcon from "../../assets/googleico.svg";
import facebookIcon from "../../assets/facebookicon.svg";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-height: 700px) {
    align-items: start;
    margin-top: 20px;
  }
`;

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40rem;
  height: 40rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  background-color: #e6f1f5;
  padding: 1rem;
  border-radius: 1rem;
  @media screen and (max-width: 960px) {
    height: auto;
    width: 80%;
  }
  @media screen and (max-height: 700px) {
    height: auto;
  }
`;

const FormInput = styled.input`
  height: 2rem;
  border-radius: 0.5rem;
  color: #113c4f;
  padding: 0.5rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

function NewUser() {
  return (
    <MainContainer>
      <FormArea>
        <h3 style={{ textAlign: "center" }}>Cadastrar-se</h3>
        <FormLabel>Email</FormLabel>
        <FormInput type="email" placeholder="Digite seu email" />
        <FormLabel>Senha</FormLabel>
        <FormInput type="password" placeholder="Digite sua senha" />
        <FormLabel>Repita a Senha</FormLabel>
        <FormInput type="password" placeholder="Digite sua senha" />
        <FormButton>Criar</FormButton>
        <p style={{ textAlign: "center" }}>ou</p>
        <BtnFacebook>
          <img
            src={facebookIcon}
            alt="A facebook logo icon in pixel perfect"
            width={30}
            height={30}
          />
          Sign Up with Facebook
        </BtnFacebook>
        <BtnGoogle>
          <img
            src={googleIcon}
            alt="A google logo icon in pixel perfect"
            width={20}
            height={20}
          />
          Sign Up with Google
        </BtnGoogle>
      </FormArea>
    </MainContainer>
  );
}

export default NewUser;
