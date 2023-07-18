import "./App.css";
import Header from "./components/Header";
import MainV2 from "./components/MainV2";
import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  function startTimer() {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    console.log(`timer started`);
    setTimeout(() => {
      clearInterval(interval);
      setIsActive(false);
    }, 30000);
  }

  return (
    <div className="App">
      <Header />
      <MainV2
        userInput={userInput}
        setUserInput={setUserInput}
        startTimer={startTimer}
        setIsActive={setIsActive}
        isActive={isActive}
        timeLeft={timeLeft}
      />
    </div>
  );
}

export default App;
