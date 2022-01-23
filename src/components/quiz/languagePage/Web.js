import React, { useEffect } from "react";
import { Wrapper } from "../../StyledComponents/HomeStyle";
import { useSelector } from "react-redux";
import Result from "../Result";
import Question from "../Question";
import { css } from "../Data";
import GetName from "../../GetName";
import { useNavigate } from "react-router-dom";

function Web() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const submit = useSelector((state) => state.submit.value);

  useEffect(() => {
    if (user.domain === "") {
      navigate("/quiz");
    }
  });

  return (
    <>
      {user.name && user.error === "" ? (
        <Wrapper>{submit ? <Result /> : <Question data={css} />}</Wrapper>
      ) : (
        <GetName />
      )}
    </>
  );
}

export default Web;
