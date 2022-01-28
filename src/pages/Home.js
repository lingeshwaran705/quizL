import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>Welcome to quizL</h1>
      <main>
        <h3>Before starting the quiz read the instructions carefully</h3>
        <ul>
          <li>
            It is mandatory to enter your roll no followed by your name.
            <br /> Eg
            <b style={{ color: "blue", paddingTop: "5px" }}> 2101131name</b>
          </li>
          <li>
            Don't put any special characters between the roll number and your
            name
          </li>
          <li>You can choose multiple domains </li>
          <li>You can't able to attend the same domain more than one time</li>
          <li>You have 45 questions per each domain </li>
          <li>For each question you have 30s to complete it</li>
          <li>
            If you refress the page in between of the quiz it never permit you
            to re-enter and your mark will be 0
          </li>
        </ul>
        <Button onClick={() => navigate("quiz")}>Get Started</Button>
      </main>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #111;
  color: white;
  h1 {
    text-align: center;
    padding: 30px 0 0 0;
    font-family: "Roboto slab", sans-serif;
    background: -webkit-linear-gradient(left, blue, cyan);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h3 {
    padding: 30px 30px 0 30px;
    text-align: center;
  }
  ul {
    overflow: hidden;
    padding: 30px;
  }
  li {
    padding: 10px;
  }
  main {
    display: flex;
    background: #111;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Button = styled.button`
  color: white;
  background: blue;
  border: none;
  padding: 10px 16px;
  font-size: 18px;
  margin: 20px 0;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    background: transparent;
    outline: 2px solid blue;
  }
`;
