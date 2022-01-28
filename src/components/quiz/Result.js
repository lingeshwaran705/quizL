import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ifSubmit } from "../../features/submit/submit";
import { reset } from "../../features/quiz/qcount";
import { resetResult } from "../../features/result/result";
import { setName, setDomain } from "../../features/quiz/user";
import { useDispatch, useSelector } from "react-redux";

function Result() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const result = useSelector((state) => state.result.value);
  const [performance, setPerformance] = useState("");

  useEffect(() => {
    if (result < 10) {
      setPerformance("Poor Performance");
    } else if (result > 10 && result < 20) {
      setPerformance("Good Performance");
    } else if (result > 20 && result < 30) {
      setPerformance("Your Performance is just Awsome");
    } else if (result > 30 && result < 40) {
      setPerformance("Such an Excellent Performance");
    } else {
      setPerformance("MindBlowing Performance");
    }
  }, [result]);

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

  return (
    <>
      <Group>
        <Card>
          <h3 style={{ letterSpacing: "1px" }}>{performance}</h3>
        </Card>
        <Main>
          <h2>Your Score</h2>
          <Mark>{result}</Mark>
        </Main>
        <Button onClick={submitHandler}>Continue to home</Button>
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
