import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
const elementRef = React.createRef();

function Template(props) {
  const [data, setData] = useState();
  const [sorted, setSorted] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  let id = 1;
  let array = [];

  const temp = async () => {
    const ref = await getDocs(collection(db, `${props.db}`));
    setData(ref.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    temp();
  }, []);

  useEffect(() => {
    for (const p in data) {
      array.push(data[p]);
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

  useEffect(() => {
    const id = setTimeout(() => {
      if (!data) {
        setError("No data found  Or Your network is too low");
      }
    }, 20000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Container animation={error ? 0 : 1}>
      <h2>Overall Rank List</h2>
      {sorted.length === 0 ? (
        <Animation>
          {error ? (
            <p style={{ textAlign: "center", paddingTop: "20px" }}>
              No Data Found Or Your Network is too low{" "}
            </p>
          ) : (
            <span />
          )}
        </Animation>
      ) : (
        <main>
          <table ref={elementRef}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Roll no</th>
                <th>Name</th>
                <th>Deparment</th>
                <th>Section</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => {
                return (
                  <Card key={item.name}>
                    <td>{id++}</td>
                    <td>{item.rno}</td>
                    <td>{item.name}</td>
                    <td>{item.department}</td>
                    <td>{item.section}</td>
                    <td>{item.score}</td>
                  </Card>
                );
              })}
            </tbody>
          </table>
        </main>
      )}
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
    width: 100%;
    min-height: 60px;
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

    & td {
      font-family: "Roboto slab", sans-serif;
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
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  span {
    width: 30px;
    height: 30px;
    background: transparent;
    border-radius: 50%;
    border-top: 3px solid rgba(68, 2, 255, 1);
    animation: ${rotate} 1s linear infinite;
  }
`;
