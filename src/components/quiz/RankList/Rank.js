import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { ifSubmit } from "../../../features/submit/submit";
import { useDispatch } from "react-redux";

const data = [
  {
    id: 1,
    title: "Web Developement",
    src: "/images/web.jfif",
    route: "webdev",
  },
  {
    id: 2,
    title: "App Developement",
    src: "/images/app.png",
    route: "appdev",
  },
  {
    id: 3,
    title: "Blockchain",
    src: "/images/blockchain.jpg",
    route: "blockchain",
  },
];

function Rank() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    navigate("/");
    dispatch(ifSubmit(false));
  };
  return (
    <>
      {open ? (
        <Wrap>
          <h1>Ranking</h1>
          <Container>
            {data.map((item) => {
              return (
                <Card
                  src={item.src}
                  title={item.title}
                  key={item.id}
                  route={item.route}
                />
              );
            })}
          </Container>
          <Button onClick={clickHandler}>Continue to home</Button>
        </Wrap>
      ) : (
        <Error>
          <h1>Result Will be published soon</h1>
        </Error>
      )}
    </>
  );
}

export default Rank;

const Error = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 30px;
  display: grid;
  place-items: center;
  background: #222;
  h1 {
    padding: 20px;
    text-align: center;
    color: white;
  }
`;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 30px;
  background: #222;
  h1 {
    padding: 20px;
    text-align: center;
    color: white;
  }
`;

const Button = styled.button`
  width: 100%;
  background: rgba(68, 2, 255, 1);
  border: 2px solid transparent;
  outline: none;
  color: white;
  font-size: 18px;
  padding: 10px;
  margin-top: 30px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    border: 2px solid rgba(68, 2, 255, 1);
    background: black;
    letter-spacing: 2px;
  }
`;

const Container = styled.section`
  background: black;
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
