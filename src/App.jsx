import { useRef, useState, useEffect } from "react";

import TypingArea from "./components/TypingArea";
import Results from "./components/Results";
import Theme from "./components/Theme";
import Options from "./components/Options";

import COMMON_WORDS from "./Words.json";

function generateText(wordCount) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
    words.push(COMMON_WORDS[randomIndex]);
  }
  return words.join(" ");
}

function App() {
  const [results, setResults] = useState(null);
  const [wordCount, setWordCount] = useState(25);
  const [text, setText] = useState(generateText(wordCount));

  const [TopSpeed, setTopSpeed] = useState(0);
  const [openTyping, setOpenTyping] = useState(true);
  const [openResult, setOpenResult] = useState(false);

  const [time, setTime] = useState(0);
  const inputRef = useRef(null);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "blue");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  let bgColor;
  let textColor;
  let hoverTextColor;
  let containerColor;
  let buttonColor;
  let InputColor;

  switch (theme) {
    case '1976':
      break;

    case '8008':
      break;

    case '9009':
      break;

    case 'dots':
      break;

    case 'light':
      bgColor = "bg-white";
      textColor = "text-black";
      InputColor = "text-gray-700";
      hoverTextColor = "hover:text-gray-600";
      containerColor = "bg-gray-200";
      buttonColor = "bg-black text-white hover:bg-gray-800";
      break;

    case 'gruvbox':
      bgColor = "bg-[#282828]";
      textColor = "text-[#c38c21]";
      hoverTextColor = "hover:text-[#d79921]";
      containerColor = "bg-[#1d2021]";
      buttonColor = "bg-[#c38c21] hover:bg-[#d79921]";
      break;

    case 'leviathan':
      bgColor = "bg-[#182031]";
      textColor = "text-[#96c166]";
      hoverTextColor = "hover:text-[#8ec07c]";
      containerColor = "bg-[#1e2a38]";
      buttonColor = "bg-[#96c166] hover:bg-[#8ec07c]";
      break;

    case 'kobayashi':
      break;

    case 'blue':
      bgColor = "bg-blue-700";
      textColor = "text-white";
      hoverTextColor = "hover:text-gray-400";
      containerColor = "bg-blue-900";
      buttonColor = "bg-orange-500 hover:bg-orange-600";
      break;
  }

  function handleFinish(stats) {
    setResults(stats);
    setOpenTyping(false);
    setOpenResult(true);
  }

  function handleRestart() {
    setResults(null);
    setOpenTyping(true);
    setOpenResult(false);
    setTime(0);
    setText(generateText(wordCount));
  }

  return (
    <div
      style={{ userSelect: "none" }}
      className={`w-screen h-screen flex flex-col items-center justify-center gap-4 transition-colors duration-300 ${bgColor} ${textColor}`}
    >
      <Theme theme={theme} setTheme={setTheme} buttonColor={buttonColor} containerColor={containerColor} />

      <Options
        time={time}
        handleRestart={handleRestart}
        TopSpeed={TopSpeed}
        setWordCount={setWordCount}
        inputRef={inputRef}
        setText={setText}
        generateText={generateText}
        wordCount={wordCount}
      />

      {!results ? (
        <TypingArea
          openTyping={openTyping}
          wordCount={wordCount}
          inputRef={inputRef}
          time={time}
          setTime={setTime}
          generateText={generateText}
          setText={setText}
          text={text}
          onFinish={handleFinish}
          onRestart={handleRestart}
          containerColor={containerColor}
          textColor={textColor}
          bgColor={bgColor}
          theme={theme}
          InputColor={InputColor}
        />
      ) : (
        <Results
          {...results}
          openResult={openResult}
          setTopSpeed={setTopSpeed}
          TopSpeed={TopSpeed}
          onRestart={handleRestart}
          wordCount={wordCount}
          containerColor={containerColor}
          textColor={textColor}
          bgColor={bgColor}
        />
      )}
    </div>
  );
}

export default App;
