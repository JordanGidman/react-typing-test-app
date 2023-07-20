import React from "react";
import { Line, LineChart } from "recharts";

export default function Results({ wpm, accuracy }) {
  return (
    <div className="results">
      <h1>Results</h1>
      <div className="graph-box">
        <span>WPM: {wpm}</span>
        <span>Accuracy: {accuracy}%</span>
      </div>
    </div>
  );
}
