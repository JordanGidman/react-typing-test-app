import React, { useEffect } from "react";

export default function Timer({
  setIsActive,
  start,
  setStart,
  timeLeft,
  setTimeLeft,
}) {
  useEffect(() => {
    function endTimer({ interval }) {
      clearInterval(interval);
      setIsActive(false);

      setStart(false);
    }

    if (start === false) return;
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    console.log(`timer started`);

    const timer = setTimeout(() => {
      endTimer(interval);
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [start, setTimeLeft, setIsActive, setStart]);

  return <span className="timer">{timeLeft}</span>;
}
