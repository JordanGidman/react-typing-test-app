import React, { useState } from "react";
import { generate, count } from "random-words";
import { nanoid } from "nanoid";

export default function Main() {
  const [words, setWords] = useState(
    generate(Math.trunc(Math.random() * (40 - 15) + 15)).join(` `)
  );
  const [userInput, setUserInput] = useState([]);
  let string = userInput
    .map((input) => input.props.letter)
    .filter((letter) => letter !== ",")
    .join(``);

  console.log(string);

  function handleUserInput(e) {
    // e.target.value === words[userInput.length - 1] ||
    // e.nativeEvent.inputType === "deleteContentBackward"
    //   ? setUserInput(e.target.value)
    //   : setUserInput((prevInput) => `${prevInput}${words[userInput.length]}`);
    console.log(userInput);

    e.nativeEvent.inputType === "deleteContentBackward" &&
      setUserInput((prevInput) => {
        let deleted = prevInput[prevInput.length - 1].key;

        console.log(deleted);
        return prevInput.filter((input) => {
          console.log(input.key);
          console.log(deleted);
          return input.key !== deleted;
        });
      });
    e.target.value === words[userInput.length - 1]
      ? setUserInput((prevInput) => [
          ...prevInput,
          <Letter
            key={nanoid()}
            letter={e.target.value}
            className={`correct`}
          />,
        ])
      : setUserInput((prevInput) => [
          ...prevInput,
          <Letter
            key={nanoid()}
            letter={words[userInput.length]}
            className={`incorrect`}
          />,
        ]);
  }

  return (
    <main className="main">
      <div className="text-box">
        <div className="words">
          <span>{words}</span> <div className="word-count">0 / 35</div>
        </div>
        <textarea
          value={userInput}
          className="words-input"
          onChange={handleUserInput}
        ></textarea>
      </div>
      <button className="reset-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="reset-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </main>
  );
}

function Letter({ letter, className, key }) {
  return (
    <span key={key} className={className}>
      {letter}
    </span>
  );
}
