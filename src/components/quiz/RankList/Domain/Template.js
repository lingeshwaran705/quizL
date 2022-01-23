import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ref, onValue } from "firebase/database";
import { db } from "../../../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
const elementRef = React.createRef();

function Template(props) {
  const [data, setData] = useState();
  const [sorted, setSorted] = useState([]);
  const navigate = useNavigate();
  let id = 1;
  let array = [];

  useEffect(() => {
    onValue(ref(db, props.db), (snapshot) => {
      setData(snapshot.val());
    });
  }, []);

  useEffect(() => {
    for (const p in data) {
      const obj = { name: p, score: data[p] };
      array.push(obj);
    }
    array = array.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.place === value.place && t.name === value.name)
    );

    array = array.sort(function (a, b) {
      return b.score - a.score;
    });

    setSorted(array);
  }, [data]);

  return (
    <Container>
      <h2>Overall Rank List</h2>
      <main>
        {sorted.length === 0 ? (
          <Animation />
        ) : (
          <table ref={elementRef}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => {
                return (
                  <Card key={item.name}>
                    <td>{id++}</td>
                    <td>{item.name}</td>
                    <td>{item.score}</td>
                  </Card>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
      <Button onClick={() => navigate("/rank")} variant>
        Back
      </Button>
    </Container>
  );
}

export default Template;

const Button = styled.button`
  width: 100%;
  background: ${(props) =>
    props.variant ? "transparent" : "rgba(68, 2, 255, 1)"};
  border: 2px solid
    ${(props) => (props.variant ? "rgba(68,2,225,1)" : "transparent")};
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

const Container = styled.div`
  background: #111;
  color: white;
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding: 10px;
  h2 {
    padding: 20px 0;
    text-align: center;
    color: white;
    background: rgba(225, 225, 225, 0.1);
    border-bottom: 2px solid rgba(0, 0, 225, 0.8);
    @media (max-width: 420px) {
      font-size: 20px;
    }
  }
  main {
    overflow-x: auto;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  table {
    padding: 20px 10px;
    list-style-type: none;
    width: 100%;
    & th {
      background: blue;
      padding: 16px;
    }
    @media (max-width: 570px) {
      width: 600px;
    }
  }
`;

const Card = styled.tr`
  background: transparent;
  width: 90%;
  margin: auto;
  padding: 20px;

  & td {
    padding: 10px 16px;
  }

  &:nth-child(even) {
    background: #222;
  }

  &:hover {
    background: blue;
  }
`;

const rotate = keyframes`
from{
    transform: rotate(0);
}
  to{
      transform: rotate(380deg);
  }
`;

const Animation = styled.div`
  width: 30px;
  height: 30px;
  background: transparent;
  display: block;
  border-top: 3px solid rgba(68, 2, 255, 1);
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;
