import React, { useState } from "react";
import { generate } from "random-words";
import Results from "./Results";
import Timer from "./Timer";
// import { nanoid } from "nanoid";

export default function MainV2({
  userInput,
  setUserInput,
  timeLeft,
  setTimeLeft,
}) {
  const [words, setWords] = useState(
    generate(Math.trunc(Math.random() * (60 - 30) + 30)).join(` `)
  );
  const [isActive, setIsActive] = useState(true);
  const [wrongCount, setWrongCount] = useState(0);
  const [start, setStart] = useState(false);

  const wordCount = words.split(` `).length;

  const letterEls = userInput.split(``).map((letter, i, arr) => {
    return (
      <Letter
        letter={letter === words[i] ? letter : words[i]}
        className={arr[i] === words[i] ? "correct" : "incorrect"}
        key={i}
      />
    );
  });

  const typedWordCount = userInput.split(` `).filter((el, i) => {
    return i !== 0 ? el !== `` : el;
  }).length;

  //wrongCount / letters
  const accuracy = userInput
    ? Math.trunc(100 - (wrongCount / userInput.split(``).length) * 100)
    : 100;

  //letters / time
  const wpm = Math.floor(userInput.split(``).length / 5 / 0.5);

  // const test = letterEls.map((letter) =>
  //   letter.props.letter === ` ` ? ` ` : letter
  // );

  //i need seperate words the above gives an arr of objects where when the arr[i] is a space
  //it means the word has ended.

  // useEffect(() => {
  //   userInput.split(` `).forEach((word, i, arr) => {
  //     // console.log(words.split(` `)[i]);
  //     word === words.split(` `)[i] && console.log(word);
  //     console.log(words.split(` `)[i]);
  //     setTypedWordCount((prevCount) => prevCount + 1);
  //   });
  // }, [userInput, words]);

  function handleUserInput(e) {
    userInput === `` && setStart(true);
    e.target.value.split(``).slice(-1)[0] !== words[userInput.length] &&
      setWrongCount((prevCount) => prevCount + 1);

    //Guard clause for multiple spaces which would throw off the word count
    if (e.target.value.slice(-1) === ` ` && userInput.slice(-1) === ` `) return;
    else setUserInput(e.target.value);
  }

  function handleReset() {
    setWords(generate(Math.trunc(Math.random() * (60 - 20) + 20)).join(` `));
    setUserInput("");
    setWrongCount(0);
    setIsActive(true);
    setTimeLeft(30);
    setStart(false);
  }

  return (
    <main className="main">
      <div className="main-inner">
        {isActive ? (
          <div className="text-box">
            <div className="words">
              <span className="words-temp">{words}</span>
              <span className="input-display">{letterEls}</span>
              <div className="word-count">
                {typedWordCount} / {wordCount}
              </div>
              <Timer
                setIsActive={setIsActive}
                start={start}
                setStart={setStart}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
              />
            </div>
            <textarea
              aria-label="box for typing"
              value={userInput}
              className="words-input"
              onChange={handleUserInput}
            ></textarea>
          </div>
        ) : (
          <Results wpm={wpm} accuracy={accuracy} />
        )}

        <button className="reset-btn" onClick={handleReset} aria-label="reset">
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
      </div>
    </main>
  );
}

function Letter({ letter, className, id }) {
  return <span className={className}>{letter}</span>;
}
