import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../../../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
const elementRef = React.createRef();

function Blockchain() {
  const [data, setData] = useState();
  const [sorted, setSorted] = useState([]);
  const navigate = useNavigate();
  let id = 1;
  let array = [];

  useEffect(() => {
    onValue(ref(db, "blockchain"), (snapshot) => {
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
    console.log(array);
  }, [data]);

  return (
    <Container>
      <h2>Overall Ranking Of Web Developement</h2>
      <main>
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
                  <td>{id++}</td> <td>{item.name}</td> <td>{item.score}</td>
                </Card>
              );
            })}
          </tbody>
        </table>
      </main>
      <Button onClick={() => navigate("/")}>Continue to home</Button>
      <Button onClick={() => navigate("/rank")} variant>
        Back
      </Button>
    </Container>
  );
}

export default Blockchain;

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
    outline: 2px solid rgba(0, 0, 225, 0.8);
    box-shadow: 0 0 16px blue;
    border-radius: 10px;
    @media (max-width: 420px) {
      font-size: 20px;
    }
  }
  main {
    overflow-x: auto;
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
    background: #444;
  }

  &:hover {
    background: blue;
  }
`;
