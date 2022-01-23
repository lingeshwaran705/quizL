import React from "react";
import {
  Wrapper,
  ButtonGroup,
  Button,
  Heading,
} from "../StyledComponents/HomeStyle";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../features/language/langSlice";

function Home() {
  const opt = [
    {
      id: 0,
      name: "JavaScript",
    },
    {
      id: 1,
      name: "HTML",
    },
    {
      id: 2,
      name: "CSS",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = (name) => {
    dispatch(changeLanguage(name));
    setTimeout(() => {
      navigate("/info");
    }, 300);
  };

  return (
    <>
      <Wrapper>
        <Heading>Choose Your favorate language and happy learning</Heading>
        <ButtonGroup>
          {opt.map((item) => {
            return (
              <Button
                key={item.id}
                onClick={() => clickHandler(item.name)}
                variant="contained"
                sx={{ background: "blue", width: "100%", mx: "auto", my: 2 }}
              >
                {item.name}
              </Button>
            );
          })}
          <Typography sx={{ textAlign: "center", my: 2, letterSpacing: "2px" }}>
            Further languages are comming soon
          </Typography>
        </ButtonGroup>
      </Wrapper>
    </>
  );
}

export default Home;
