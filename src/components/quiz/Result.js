import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ifSubmit } from "../../features/submit/submit";
import { reset } from "../../features/quiz/qcount";
import { resetResult } from "../../features/result/result";
import { setName, setDomain } from "../../features/quiz/user";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { db } from "../../utils/firebaseConfig";

function Result() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [result, setResult] = useState();
  const user = useSelector((state) => state.user.value);

  var performence = "";
  if (result < 3) {
    performence = "Poor";
  } else if (result > 3 && result < 6) {
    performence = "Good";
  } else if (result > 6 && result < 9) {
    performence = "Excellent";
  } else {
    performence = "MindBlowing";
  }
  const submitHandler = () => {
    setTimeout(() => {
      dispatch(ifSubmit(false));
      dispatch(reset());
      dispatch(resetResult());
      dispatch(setDomain(""));
      dispatch(setName(""));
    }, 200);
    navigate("/quiz");
  };

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `${user.domain}/${user.name}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setResult(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <>
      <Group>
        <Card>
          <h3 style={{ letterSpacing: "1px" }}>{performence} Performance </h3>
        </Card>
        <Main>
          <h2>Your Score</h2>
          <Mark>{result}</Mark>
        </Main>
        <Button onClick={submitHandler}>Continue to home</Button>
        <Button onClick={() => navigate("/rank")}>Overall Rank</Button>
      </Group>
    </>
  );
}

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

const Group = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  @media (min-width: 500px) {
    width: 400px;
  }
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.div`
  width: 100%;
  border-top: 5px solid rgba(68, 2, 255, 1);
  background: rgba(68, 2, 255, 0.2);
  color: white;
  padding: 20px;
  text-align: center;
  margin-bottom: 16px;
`;

const Main = styled(Card)`
  box-sizing: border-box;
  border: 2px solid white;
  color: rgba(68, 2, 255, 1);
  background: transparent;
  margin: 40px 0px;
  h2 {
    padding-bottom: 20px;
  }
`;

const Mark = styled.h1`
  color: white;
`;

export default Result;
