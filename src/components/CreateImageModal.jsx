import styled from "styled-components";
import OpenAI from "openai";
import loadingEngine from '../assets/gear-spinner.svg';
import React, {useState} from 'react';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ModalContainer = styled.div`
  top: 12rem;
  width: 30rem;
  height: 10rem;
  position: absolute;
  background-color: #e6f1f5;
  z-index: 9999;
  border-radius: 1rem;
  padding: 1rem;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;
const CreateButton = styled.button`
  width: 250px;
  height: 50px;
  margin: 1rem 0rem;
  background-color: #113c4f;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
`;
const Input = styled.input`
  width: 90%;
  height: 70%;
  padding: 0.2rem;
  font-size: 1.2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
function CreateImageModal({ closeModal, generatedImage }) {
  const [imageDescription, setImageDescription] = useState('');
  const [loader, setLoader] = useState(false);

  const generateImage = async () => {
    try{
      console.log('Generating...')
      setLoader(true);
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: imageDescription,
        size: "1024x1024",
        n: 1,
        quality: 'standard',
      });
      console.log(response.data[0].url);
      generatedImage(response.data[0].url);
    } catch(error){
      console.error("Error generating image: ", error);
    }
    setLoader(false);
    closeModal();
  };

  const handleInputChange = (e) => {
    setImageDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage();
  }

  return (
    <Overlay>
      <ModalContainer>
        {loader ? (     <div style={{ height: '100%',display: "flex", flexDirection: 'column',alignItems: "center", justifyContent: 'center' }}>
          <img src={loadingEngine} alt="A svg made spinner." width={68} height={80}/>
          <p style={{fontSize: '20px', fontWeight: 'bold'}}>Trabalhando nisso...</p>
        </div>)
        :(
          <>
          <div style={{ display: "flex",justifyContent: "space-between" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>
            Descreva a persona que deseja criar:{" "}
          </h3>
          <span
            style={{ fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}
            onClick={closeModal}
          >
            x
          </span>
          </div>
          <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Descreva características físicas aqui..."
            onChange={handleInputChange}
            value={imageDescription}
          />
          <CreateButton>Gerar Persona</CreateButton>
        </Form>
        </>
        )  
      }
   
     
     
      </ModalContainer>
    </Overlay>
  );
}

export default CreateImageModal;
