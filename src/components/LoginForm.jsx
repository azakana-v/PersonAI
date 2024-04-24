import styled from "styled-components";
import googleIcon from '../assets/googleico.svg';
import facebookIcon from '../assets/facebookicon.svg';
import { useNavigate } from "react-router-dom";

const FormArea = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20rem;
    height: 20rem;
    background-color: #E6F1F5;
    padding: 1rem;
    border-radius: 1rem;
`;

const FormInput = styled.input`
height: 2rem;
border-radius: 0.5rem;
color: #113C4F;
padding: 0.1rem;
border: 1px solid #ccc;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
`
const FormButton = styled.button`
margin: 1rem 0rem;
background-color: #113C4F;
color: #fff;
border-radius: 0.5rem;
padding: 0.5rem;
cursor: pointer;
`

const BtnFacebook = styled.button`
    display: flex !important;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    height:35px;  
    border-radius: 4px;
    background: #3b5998;
    color:white;
    border:0px transparent;  
    text-align: center;
    cursor: pointer;
    margin:5px;
    display: inline-block;
    &:hover{
        background: #3b5998;
        opacity: 0.9;
    }
`
const BtnGoogle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin:5px;
    cursor: pointer;
    width: 100%;
    height:35px;
    border-radius: 4px;
    background: #db3236;
    color:white;
    border:0px transparent;
    text-align: center;
 
    &:hover{
        background: #db3236;
        opacity: 0.9;
    }
`

function LoginForm(){

const navigate = useNavigate();
    return(
        <FormArea>
            <h3 style={{ textAlign:"center" }}>Realizar Log In</h3>
            <FormLabel>Email</FormLabel>
            <FormInput type="email" placeholder="Digite seu email" />
            <FormLabel>Senha</FormLabel>
            <FormInput type="password" placeholder="Digite sua senha" />
            <FormButton>Entrar</FormButton>
            <p style={{textAlign: 'center'}}>ou</p>
            <BtnFacebook >
                <img src={facebookIcon} alt="A facebook logo icon in pixel perfect" width={30} height={30}/>
                Sign In with Facebook
            </BtnFacebook >
            <BtnGoogle>
                <img src={googleIcon} alt="A google logo icon in pixel perfect"  width={20} height={20}/>
                Sign In with Google
            </BtnGoogle >
            <span onClick={() => navigate("/NewUser")} style={{ textAlign: 'center', marginTop: '0.3rem', color:'#0000EE', cursor: 'pointer' }}>Não possui conta? Crie uma agora.</span>
        </FormArea>
    )
}

export default LoginForm;