import React from "react";
import styled from "styled-components";
import Card from "./Card";

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
    title: "Blockchain Developement",
    src: "/images/blockchain.jpg",
    route: "blockchain",
  },
];

function Rank() {
  return (
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
    </Wrap>
  );
}

export default Rank;

const Wrap = styled.div`
  background: #222;
  h1 {
    padding: 20px;
    text-align: center;
    color: white;
  }
`;

const Container = styled.section`
  background: black;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
