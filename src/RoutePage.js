import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import App from "./components/quiz/languagePage/App";
import Web from "./components/quiz/languagePage/Web";
import Blockchain from "./components/quiz/languagePage/Blockchain";
import Rank from "./components/quiz/RankList/Rank";
import WebResult from "./components/quiz/RankList/Domain/Web";
import AppResult from "./components/quiz/RankList/Domain/App";
import BlockchainResult from "./components/quiz/RankList/Domain/Blockchain";

function RoutePage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/appdev" element={<App />} />
        <Route path="/quiz/webdev" element={<Web />} />
        <Route path="/quiz/blockchain" element={<Blockchain />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/rank/webdev" element={<WebResult />} />
        <Route path="/rank/appdev" element={<AppResult />} />
        <Route path="/rank/blockchain" element={<BlockchainResult />} />
      </Routes>
    </Router>
  );
}

export default RoutePage;
