import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: black;
  color: white;
  padding: 10px;
`;

export const Button = styled.button`
  background: blue;
  border: none;
  color: white;
  outline: none;
  padding: 10px 16px;
  font-size: 16px;
  letter-spacing: 1px;
  border-radius: 5px;
  width: 100%;
  margin: 10px 0px 10px 0px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.5s;
  &:hover {
    background: black;
    border: 2px solid blue;
    color: blue;
    letter-spacing: 2px;
  }
  font-family: Roboto slab;
`;

export const ButtonGroup = styled.div`
  width: 80%;
  margin: auto;
  @media (min-width: 600px) {
    width: 300px;
  }
`;

export const Heading = styled.h1`
  font-size: 20px;
  text-align: center;
  padding: 20px 10px;
  margin: 10px 0px;
  color: ${(props) => (props.color ? "blue" : "")};
  letter-spacing: 1px;
  line-height: 35px;
  border-bottom: 2px solid blue;
  width: 100%;
`;

export const CardGroup = styled.div`
  margin: auto;
  width: 100%;
  @media (min-width: 600px) {
    width: 500px;
  }
`;

export const Card = styled.button`
  display: block;
  width: 100%;
  font-size: 16px;
  background: #333;
  color: white;
  padding: 16px;
  border: 2px solid transparent;
  transition: 0.3s;
  text-align: center;
  cursor: pointer;
  margin: 20px 0px;
  &:hover {
    background: black;
    color: blue;
    letter-spacing: 1px;
  }
  &:focus {
    border: 2px solid blue;
  }
`;

export const NextBtn = styled.button`
  outline: none;
  border-radius: 4px;
  float: right;
  margin: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 7px 20px;
  font-size: 16px;
  letter-spacing: 1px;
  background: ${(props) => (props.disabled ? "#555" : "blue")};
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  border: 2px solid transparent;
  color: white;
  transition: 0.3s;
  &:hover {
    background: ${(props) => (props.disabled ? "" : "black")};
    border: 2px solid ${(props) => (props.disabled ? "transparent" : "blue")};
  }
`;

export const FooterBtn = styled.div`
  padding-top: 20px;
`;

export const Timer = styled.span`
  padding: 4px 8px;
  color: white;
  background: black;
  border: 2px solid white;
  float: right;
  margin: 10px 20px;
  &::after {
    clear: both;
    content: "";
  }
`;
