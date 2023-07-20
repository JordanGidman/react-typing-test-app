import "./App.css";
import Header from "./components/Header";
import MainV2 from "./components/MainV2";

import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  return (
    <div className="App">
      <Header />
      <MainV2
        userInput={userInput}
        setUserInput={setUserInput}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
      />
    </div>
  );
}

export default App;
