import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setName, setError, process } from "../features/quiz/user";
import { setuser } from "../features/quiz/dbuser";
import { db } from "../utils/firebaseConfig";
import { findDep, findSection } from "./Calculation";
import { collection, addDoc, getDocs } from "firebase/firestore";

function GetName() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const dbuser = useSelector((state) => state.dbuser.value);
  const [data, setData] = useState([]);

  const update = async () => {
    const ref = await getDocs(collection(db, `${user.domain}`));
    setData(ref.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    dispatch(setuser(ref.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  };

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (dbuser.length !== 0) {
      dispatch(process(false));
    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setName(input));
    if (input == "") {
      dispatch(setError("Please Fill This Field"));
    } else if (/^[0-9]{7}/g.test(input)) {
      if (/[A-Za-z]{3,}$/g.test(input)) {
        const between = input.charAt(7);
        console.log(between);
        if (between == " ") {
          dispatch(setError("Remove space between rno & name"));
        } else {
          if (/[^A-Za-z]/g.test(between)) {
            dispatch(setError("Remove the special character"));
          } else {
            const duplicaterno = data.find(
              (item) => item.rno == input.slice(0, 7)
            );
            if (duplicaterno) {
              dispatch(setError("User already exists"));
            } else {
              if (data.length === 0) {
                dispatch(process(true));
              }
              dispatch(setError(""));
              const username = input.slice(7);
              const rno = input.slice(0, 7);
              const dep = rno.slice(2, 4);
              const section = rno.charAt(4);
              try {
                await addDoc(collection(db, `${user.domain}`), {
                  user: input,
                  name: username,
                  rno: rno,
                  department: findDep(dep),
                  section: findSection(section),
                  score: 0,
                });
                update();
                console.log("executin");
              } catch (e) {
                dispatch(setError("Something went wrong"));
              }
            }
          }
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
        <input
          onChange={changeHandler}
          autoComplete="off"
          type="text"
          name="name"
        />
        {user.error ? <span>{user.error}</span> : ""}
        {user.processing ? <p>Processing...</p> : ""}
        <button type="submit">Continue</button>
      </form>
    </Container>
  );
}

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

export default GetName;
