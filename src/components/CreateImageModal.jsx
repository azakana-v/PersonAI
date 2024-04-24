import styled from "styled-components";

const ModalContainer = styled.div`
    top: 12rem;
    width: 30rem;
    height: 10rem;
    position: absolute;
    background-color: #E6F1F5;
    z-index: 9999;
    border-radius: 1rem;
    padding: 1rem;
`
const Form = styled.form`
    width: 100%;
    height: 100%;   
    display: flex;
    flex-direction: column;
    align-items: center;
`
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
background-color: #113C4F;
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
`

function CreateImageModal({ closeModal }){
    return(  
        <Overlay>
        <ModalContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Descreva a persona que deseja criar: </h3>
            <span style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} onClick={closeModal}>x</span>
            </div>
            <Form>
                <Input type="text" placeholder="Descreva características físicas aqui..."/>
                <CreateButton
              onClick={() => {
                addData();
                // setCreated(true);
              }}
            >
              Gerar Persona
            </CreateButton>
            </Form>
        </ModalContainer>
        </Overlay>
    )
}

export default CreateImageModal;