import React, { lazy, Suspense } from "react";
import styled, { keyframes } from "styled-components";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import App from "./components/quiz/languagePage/App";
import Web from "./components/quiz/languagePage/Web";
import Blockchain from "./components/quiz/languagePage/Blockchain";
import WebResult from "./components/quiz/RankList/Domain/Web";
import AppResult from "./components/quiz/RankList/Domain/App";
import BlockchainResult from "./components/quiz/RankList/Domain/Blockchain";
const Rank = lazy(() => import("./components/quiz/RankList/Rank"));

function RoutePage() {
  return (
    <Suspense
      fallback={
        <Animation>
          <span />
        </Animation>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/appdev" element={<App />} />
          <Route path="/quiz/webdev" element={<Web />} />
          <Route path="/quiz/blockchain" element={<Blockchain />} />
          <Route path="/rank" element={<Rank />} />
          {/* <Route path="/rank/webdev" element={<WebResult />} />
          <Route path="/rank/appdev" element={<AppResult />} />
          <Route path="/rank/blockchain" element={<BlockchainResult />} /> */}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default RoutePage;

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
  height: 100vh;
  background: black;
  display: flex;
  align-items: ceter;
  justify-content: center;
  span {
    width: 30px;
    height: 30px;
    background: transparent;
    display: block;
    border-top: 3px solid rgba(68, 2, 255, 1);
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
    margin: auto;
  }
`;
