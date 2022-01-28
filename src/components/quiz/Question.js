import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { next } from "../../features/quiz/qcount";
import { changeResult } from "../../features/result/result";
import { ifSubmit } from "../../features/submit/submit";
import { setCount, setInitialCount } from "../../features/quiz/count";
import {
  Card,
  CardGroup,
  Heading,
  NextBtn,
  FooterBtn,
} from "../StyledComponents/HomeStyle";
import styled from "styled-components";
import { db } from "../../utils/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
function Question({ data }) {
  const qcount = useSelector((state) => state.qcount.value);
  const count = useSelector((state) => state.count.value);
  const [ans, setAns] = useState(0);
  const [result, setResult] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const dbdata = useSelector((state) => state.dbuser.value);

  useEffect(() => {
    setResult((prev) => {
      return prev + (ans ? 1 : 0);
    });
  }, [ans]);

  useEffect(() => {
    dispatch(setInitialCount(30));
  }, [data]);

  const increament = () => {
    if (qcount !== data.length - 1) {
      dispatch(setInitialCount(30));
      dispatch(next());
      setAns(0);
    } else {
      const currentuser = dbdata.find((item) => item.user == user.name);
      let newData = {
        score: result,
      };
      const docRef = doc(db, user.domain, currentuser.id);
      updateDoc(docRef, newData);
      dispatch(ifSubmit(true));
    }

    dispatch(changeResult(ans));
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (count > 0) {
        dispatch(setCount());
      } else {
        if (qcount === data.length - 1) {
          dispatch(ifSubmit(true));
        } else {
          increament();
        }
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [count]);

  const clickHandler = (val) => {
    setAns(val);
  };

  return (
    <Container>
      <Counting sec={count}>{count}</Counting>
      <Heading>{data[qcount].question}</Heading>
      <CardGroup>
        {data[qcount].answerOptions.map((answer) => {
          return (
            <Card onClick={() => clickHandler(answer.isTrue)} key={answer.id}>
              {answer.ansText}
            </Card>
          );
        })}
        <FooterBtn>
          <NextBtn onClick={increament}>
            {qcount === data.length - 1 ? "Submit" : "Next"}
          </NextBtn>{" "}
        </FooterBtn>
      </CardGroup>
    </Container>
  );
}

export default Question;

const Container = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Counting = styled.h3`
  display: block;
  font-size: 22px;
  font-family: "Roboto slab", sans-serif;
  color: ${(props) => (props.sec > 10 ? "blue" : "orangered")};
`;
