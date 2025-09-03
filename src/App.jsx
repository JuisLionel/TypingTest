import { useState } from "react";

function App() {
  const Text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const words = Text.split(" ");

  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [correctWords, setCorrectWords] = useState(0);

  const [correctChars, setCorrectChars] = useState(0);
  const [wrongChars, setWrongChars] = useState(0);

  const [typedWords, setTypedWords] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  console.log(typedWords)

  function handleChange(e) {
    if (!startTime) setStartTime(Date.now());
    setInput(e.target.value);
  }

  function handleKeyDown(e) {
    const target = words[currentWordIndex];

    if (e.key === " ") {
      e.preventDefault();

      const typed = input.trim();
      const missing = Math.max(0, target.length - typed.length);
      if (missing > 0) {
        setWrongChars((w) => w + missing);
      }

      checkWord();
      return;
    }

    const isPrintable =
      e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;

    if (isPrintable) {
      const idx = input.length;
      const expected = target[idx]; h

      if (expected && e.key === expected) {
        setCorrectChars((c) => c + 1);
      } else {
        setWrongChars((w) => w + 1);
      }
    }
  }

  function checkWord() {
    const typed = input.trim();
    const target = words[currentWordIndex];
    const isCorrect = typed === target;

    if (isCorrect) setCorrectWords((c) => c + 1);

    const renderedWord = (
      <span key={currentWordIndex} className="mr-2">
        {target.split("").map((char, i) => {
          let color = "";
          if (i < typed.length) {
            color = typed[i] === char ? "text-green-400" : "text-red-400";
          } else {
            color = "text-red-400";
          }
          return (
            <span key={i} className={color}>
              {char}
            </span>
          );
        })}
        {typed.length > target.length &&
          typed
            .slice(target.length)
            .split("")
            .map((ch, i) => (
              <span key={i} className="text-red-400">
                {ch}
              </span>
            ))}
      </span>
    );

    setTypedWords((t) => [...t, { rendered: renderedWord }]);

    const nextIndex = currentWordIndex + 1;
    setCurrentWordIndex(nextIndex);
    setInput("");

    if (nextIndex === words.length) setEndTime(Date.now());
  }

  function renderWord(word, index) {
    if (index < typedWords.length) return typedWords[index].rendered;

    if (index === currentWordIndex) {
      return (
        <span key={index} className="mr-2">
          {word.split("").map((char, i) => {
            let color = "";
            if (i < input.length) {
              color = input[i] === char ? "text-green-400" : "text-red-400";
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
              .map((ch, i) => (
                <span key={i} className="text-red-400">
                  {ch}
                </span>
              ))}
        </span>
      );
    }

    return (
      <span key={index} className="mr-2">
        {word}
      </span>
    );
  }

  const totalEvaluated = correctChars + wrongChars;
  const accuracy =
    totalEvaluated > 0
      ? Math.round((correctChars / totalEvaluated) * 100)
      : 0;

  let wpm = 0;
  let timeTakenSec = 0;
  if (startTime && endTime) {
    timeTakenSec = Math.floor((endTime - startTime) / 1000);
    const minutes = timeTakenSec / 60;
    wpm = minutes > 0 ? Math.round(correctWords / minutes) : correctWords;
  }

  return (
    <div className="bg-blue-700 w-screen h-screen p-4 flex justify-center items-center">
      <div className="w-[900px] h-[500px] bg-blue-900 rounded p-4 flex flex-col items-center">
        {!endTime ? (
          <>
            <div className="mb-4 bg-blue-500 p-2 w-full h-full rounded">
              <div className="mb-4 flex flex-wrap w-full items-start">
                {words.map((w, i) => renderWord(w, i))}
              </div>
            </div>
            <div className="flex w-full">
              <input
                placeholder="Type here ..."
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className="text-black rounded w-full h-[50px] bg-blue-500 p-2"
              />

              <button className="ml-2 bg-blue-500 text-white px-4 rounded">
                Restart
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4 space-y-1">
            <p>Correct words: {correctWords}</p>
            <p>Total characters (eval): {totalEvaluated}</p>
            <p>Accuracy (chars): {accuracy}%</p>
            {endTime && (
              <>
                <p>Time taken: {timeTakenSec}s</p>
                <p>WPM : {wpm}</p>
              </>
            )}

            <button ></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
