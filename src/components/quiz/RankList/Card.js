import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(props.route)}>
      <img src={props.src} />
      <h2>{props.title}</h2>
    </Container>
  );
}

export default Card;

const Container = styled.div`
  width: 250px;
  height: 270px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background: rgba(225, 225, 225, 0.1);
  cursor: pointer;
  margin: 20px;

  &:hover {
    outline: 2px solid blue;
    box-shadow: 0 0 16px blue;
  }
  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
  h2 {
    height: 30%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;
