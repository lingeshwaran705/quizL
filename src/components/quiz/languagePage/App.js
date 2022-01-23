import React, { useEffect } from "react";
import { Wrapper } from "../../StyledComponents/HomeStyle";
import { useSelector } from "react-redux";
import Result from "../Result";
import Question from "../Question";
import { html } from "../Data";
import GetName from "../../GetName";
import { useNavigate } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.value);
  const submit = useSelector((state) => state.submit.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.domain === "") {
      navigate("/quiz");
    }
  });

  return (
    <>
      {user.name && user.error === "" ? (
        <Wrapper>{submit ? <Result /> : <Question data={html} />}</Wrapper>
      ) : (
        <GetName />
      )}
    </>
  );
}

export default App;
