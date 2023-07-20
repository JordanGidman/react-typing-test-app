import React, { useEffect, useState } from "react";

export default function Timer({
  setIsActive,
  start,
  setStart,
  timeLeft,
  setTimeLeft,
}) {
  //   const [timeLeft, setTimeLeft] = useState(30);
  //   const [start, setStart] = useState(false);

  useEffect(() => {
    if (start === false) return;
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    console.log(`timer started`);
    const timer = setTimeout(() => {
      console.log(timer);
      clearInterval(interval);
      setIsActive(false);
      clearTimeout(timer);
      setStart(false);
    }, 30000);
  }, [start]);

  return <span className="timer">{timeLeft}</span>;
}
