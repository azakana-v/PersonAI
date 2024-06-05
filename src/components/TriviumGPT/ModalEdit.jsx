import React, { useState } from "react";
import styled from "styled-components";

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
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  /* opacity: 1; */
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

const ModalEdit = ({ closeModal, systemPai, salutePai, editData }) => {
  const [salute, setSalute] = useState("");
  const [system, setSystem] = useState("");
  const [loader, setLoader] = useState(false);

  const handleInputChange = (e) => {
    setSalute(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setSystem(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editData(salute, system);
  };

  return (
    <Overlay>
      <ModalContainer>
        {loader ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={loadingEngine}
              alt="A svg made spinner."
              width={68}
              height={80}
            />
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Trabalhando nisso...
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>
                Nova saudação inicial:{" "}
              </h3>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              >
                x
              </span>
            </div>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder={salutePai}
                onChange={handleInputChange}
                value={salute}
              />
              <div style={{ width: "100%" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>Novo comportamento </h3>
              </div>
              <Input
                type="text"
                placeholder={systemPai}
                onChange={handleInputChange2}
                value={system}
              />
              <CreateButton>Editar Persona!</CreateButton>
            </Form>
          </>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default ModalEdit;
