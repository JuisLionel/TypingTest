import { useState, useEffect, useRef } from "react";
import WordRenderer from "./WordRenderer";
import { IoReloadSharp } from "react-icons/io5";

function TypingArea({
  text = "",
  onFinish,
  setText,
  wordCount,
  generateText,
  openTyping,
  time,
  setTime,
  inputRef,
  bgColor,
  InputColor,
  containerColor,
  theme,
  RestrartButton,
  OptionCorlor,
}) {
  const words = text ? text.split(" ") : [];

  const [typed, setTyped] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [finishedWords, setFinishedWords] = useState([]);
  const [finished, setFinished] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

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

  useEffect(() => {
    if (typed.length === 1 && !isRunning) start();
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
      stop();
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
        time,
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
            theme={theme}
          />
        );
      } else if (idx === currentWordIndex && !finished) {
        return (
          <WordRenderer key={idx} word={w} typed={typed} isCurrent={true} theme={theme} />
        );
      } else {
        return <WordRenderer key={idx} word={w} theme={theme} />;
      }
    });
  }

  function restart() {
    setTyped("");
    setCurrentWordIndex(0);
    setFinishedWords([]);
    reset();
    setFinished(false);
    setText(generateText(wordCount));

    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <>
      <div className={`w-[95%] max-w-4xl min-h-[500px] sm:min-h-[500px] ${containerColor} rounded p-4 flex flex-col items-center text-white ${openTyping ? "Open" : "Close"}`}>
        <div className={`mb-4 ${OptionCorlor ? OptionCorlor : bgColor} p-2 w-full flex-1 rounded text-[16px] sm:text-[18px] leading-relaxed`}>
          <div className="flex flex-wrap w-full">{renderWords()}</div>
        </div>

        <div className="flex w-full">
          <input
            ref={inputRef}
            placeholder="Type here ..."
            value={typed}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`rounded w-full h-[45px] sm:h-[50px] ${OptionCorlor ? OptionCorlor : bgColor} p-2 outline-none text-[18px] sm:text-[20px] ${InputColor}`}
            spellCheck={false}
            autoFocus
          />
          <button
            onClick={restart}
            className={`ml-2 ${OptionCorlor ? OptionCorlor : bgColor} ${RestrartButton ? RestrartButton : InputColor} px-3 sm:px-4 rounded group hover:bg-blue-600 hover:scale-105 transition-all ease-in-out duration-150 flex items-center justify-center`}
          >
            <IoReloadSharp
              className="transition-transform duration-300 group-hover:rotate-360"
              size={28}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default TypingArea;
