import { useState, useEffect } from "react";

function App() {
  const Text = "asd qwe zxc rty fgh jkl vbn mnb poi lkj"; // sample text
  const words = Text.split(" ");

  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [typedWords, setTypedWords] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  function handleChange(e) {
    if (!startTime) {
      setStartTime(Date.now()); // start timer when typing begins
    }
    setInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === " ") {
      e.preventDefault();
      checkWord();
    }
  }

  function checkWord() {
    const isCorrect = input.trim() === words[currentWordIndex];
    if (isCorrect) {
      setCorrectWords(correctWords + 1);
    }

    setTypedWords([
      ...typedWords,
      { word: words[currentWordIndex], typed: input.trim(), correct: isCorrect },
    ]);

    const nextIndex = currentWordIndex + 1;
    setCurrentWordIndex(nextIndex);
    setInput("");

    // if last word → stop timer
    if (nextIndex === words.length) {
      setEndTime(Date.now());
    }
  }

  // render with highlights
  function renderWord(word, index) {
    if (index < typedWords.length) {
      return (
        <span
          key={index}
          className={`mr-2 ${typedWords[index].correct ? "text-green-400" : "text-red-400"
            }`}
        >
          {word}
        </span>
      );
    }

    if (index === currentWordIndex) {
      return (
        <span key={index} className="mr-2">
          {word.split("").map((char, i) => {
            let color = "";
            if (i < input.length) {
              if (input[i] === char) {
                color = "text-green-400";
              } else {
                color = "text-red-400";
              }
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
          {input.length > word.length &&
            input
              .slice(word.length)
              .split("")
              .map((char, i) => (
                <span key={i} className="text-red-400">
                  {char}
                </span>
              ))}
        </span>
      );
    }

    return <span key={index} className="mr-2">{word}</span>;
  }

  const totalTyped = typedWords.length;
  const accuracy =
    totalTyped > 0 ? Math.round((correctWords / totalTyped) * 100) : 0;

  let wpm = 0;
  let timeTakenSec = 0;
  if (startTime && endTime) {
    timeTakenSec = Math.floor((endTime - startTime) / 1000);
    const minutes = timeTakenSec / 60;
    wpm = minutes > 0 ? Math.round(correctWords / minutes) : correctWords;
  }

  return (
    <div className="bg-blue-800 w-screen h-screen text-white p-4">
      <h1 className="text-xl mb-4">Typing Test</h1>

      <div className="mb-4 flex flex-wrap">
        {words.map((w, i) => renderWord(w, i))}
      </div>

      {endTime ? (
        <p className="text-2xl mt-4">✅ Finished!</p>
      ) : (
        <input
          placeholder="Type here ..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="text-black px-2 py-1 rounded w-64"
        />
      )}

      <div className="mt-4">
        <p>Correct words: {correctWords}</p>
        <p>Total typed: {totalTyped}</p>
        {endTime && (
          <>
            <p>Accuracy: {accuracy}%</p>
            <p>Time taken: {timeTakenSec}s</p>
            <p>WPM: {wpm}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

