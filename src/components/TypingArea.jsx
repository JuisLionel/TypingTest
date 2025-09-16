import { useState, useEffect, useRef } from "react";
import WordRenderer from "./WordRenderer";
import { IoReloadSharp } from "react-icons/io5";

function TypingArea({ text = "", onFinish, setText, wordCount, generateText, openTyping }) {
  const words = text ? text.split(" ") : [];

  const [typed, setTyped] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [finishedWords, setFinishedWords] = useState([]);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  console.log(time / 1000)

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (typed.length === 1 && !isRunning) {
      start()
    }
  }, [typed, isRunning]);

  function handleChange(e) {
    setTyped(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === " ") {
      e.preventDefault();
      checkWord();
    }
  }

  function checkWord() {
    const typedWord = typed.trim();
    const target = words[currentWordIndex] ?? "";

    setFinishedWords((prev) => [...prev, { typed: typedWord, target }]);
    const nextIndex = currentWordIndex + 1;

    if (nextIndex >= words.length) {
      stop()
      setFinished(true);

      let correctChars = 0;
      let wrongChars = 0;
      const allFinished = [...finishedWords, { typed: typedWord, target }];
      allFinished.forEach(({ typed: t, target: tg }) => {
        const maxLen = Math.max(t.length, tg.length);
        for (let i = 0; i < maxLen; i++) {
          if (t[i] === tg[i]) correctChars++;
          else wrongChars++;
        }
      });

      onFinish({
        correctChars,
        wrongChars,
        correctWords: allFinished.filter((w) => w.typed === w.target).length,
        time
      });
    } else {
      setCurrentWordIndex(nextIndex);
    }

    setTyped("");
  }

  function renderWords() {
    return words.map((w, idx) => {
      if (idx < finishedWords.length) {
        const f = finishedWords[idx];
        return (
          <WordRenderer
            key={idx}
            word={f.target}
            typed={f.typed}
            isFinal={true}
          />
        );
      } else if (idx === currentWordIndex && !finished) {
        return (
          <WordRenderer
            key={idx}
            word={w}
            typed={typed}
            isCurrent={true}
          />
        );
      } else {
        return <WordRenderer key={idx} word={w} />;
      }
    });
  }

  function restart() {
    setTyped("");
    setCurrentWordIndex(0);
    setFinishedWords([]);
    reset()
    setFinished(false);
    setText(generateText(wordCount));

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  return (
    <>
      <h2 className="text-white">{(time / 1000).toFixed(1)}s</h2>
      <div className={`w-[900px] h-[500px] bg-blue-900 rounded p-4 flex flex-col items-center text-white ${openTyping ? "Open" : "Close"}`}>
        <div className="mb-4 bg-blue-700 p-2 w-full h-full rounded text-[20px] leading-relaxed overflow-auto">
          <div className="flex flex-wrap w-full items-start">
            {renderWords()}
          </div>
        </div>

        <div className="flex w-full">
          <input
            ref={inputRef}
            placeholder="Type here ..."
            value={typed}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="rounded w-full h-[50px] bg-blue-700 p-2 text-white"
            spellCheck={false}
            autoFocus

          />
          <button
            onClick={restart}
            className="ml-2 bg-blue-700 text-white px-4 rounded group hover:bg-blue-600 hover:scale-105 transition-all ease-in-out duration-150 flex items-center justify-center"
          >
            <IoReloadSharp
              className="transition-transform duration-300 group-hover:rotate-360"
              size={30}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default TypingArea;
