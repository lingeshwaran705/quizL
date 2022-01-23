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
import { getDatabase, ref, child, get, update } from "firebase/database";

function Question({ data }) {
  const qcount = useSelector((state) => state.qcount.value);
  const count = useSelector((state) => state.count.value);
  const [ans, setAns] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [dbdata, setDbdata] = useState();

  useEffect(() => {
    dispatch(setInitialCount(25));
  }, [data]);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `${user.domain}/${user.name}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDbdata(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const increament = () => {
    if (qcount !== data.length - 1) {
      dispatch(setInitialCount(25));
      dispatch(next());
      setAns(0);
    } else {
      dispatch(ifSubmit(true));
    }
    update(ref(db), {
      [`${user.domain}/${user.name}`]: dbdata + (ans ? 1 : 0),
    });
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
      <h3>{count}</h3>
      <Heading color="blue">{data[qcount].question}</Heading>
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
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
