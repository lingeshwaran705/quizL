import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setName, setError } from "../features/quiz/user";
import { app, db } from "../utils/firebaseConfig";
import { ref, set, child, get, update } from "firebase/database";

function GetName() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const dbRef = ref(db);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setName(input));
    if (input === "") {
      dispatch(setError("Please Fill This Field"));
    }
    if (/^[0-9]{6}/g.test(input)) {
      if (/[A-Za-z]{3,}$/g.test(input)) {
        if (/\s/g.test(input)) {
          get(child(dbRef, `${user.domain}`))
            .then((snapshot) => {
              const usr = snapshot.val();
              if (snapshot.exists()) {
                if (usr[input] === 0 || usr[input]) {
                  dispatch(setError("User id already exists"));
                } else {
                  update(ref(db, `${user.domain}`), {
                    [input]: 0,
                  });
                  dispatch(setError(""));
                }
              } else {
                set(ref(db, `${user.domain}`), {
                  [input]: 0,
                });
              }
            })
            .catch((error) => {
              dispatch(setError("Invalid username"));
            });
        } else {
          dispatch(setError("Give space between rno & name"));
        }
      } else {
        dispatch(setError("Invalid username"));
      }
    } else {
      dispatch(setError("Invalid username"));
    }
  };

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <h4>Enter the roll no follwed by your name</h4>
        <input onChange={changeHandler} type="text" name="name" />
        {user.error ? <span>{user.error}</span> : ""}
        <button type="submit">Continue</button>
      </form>
    </Container>
  );
}

export default GetName;

const Container = styled.section`
  background: #111;
  color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & form {
    width: 400px;
    background: #222;
    margin: auto;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 2px 2px 5px black, -3px -3px 5px #555;
    @media (max-width: 420px) {
      width: 90%;
    }
  }
  & h4 {
    padding-bottom: 20px;
    font-size: 18px;
  }
  & input {
    padding: 10px 16px;
    font-size: 17px;
    background: #333;
    outline: none;
    border: none;
    border-bottom: 2px solid blue !important;
    color: white;
    margin: 20px 0;
  }

  & button {
    padding: 10px 16px;
    background: transparent;
    color: white;
    font-size: 18px;
    border: 2px solid #555;
    margin-top: 20px;
    cursor: pointer;
    &:focus {
      border: 2px solid blue;
    }
  }

  & span {
    color: #f00;
  }
`;
