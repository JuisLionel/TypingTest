import { useRef, useState, useEffect } from "react";

import TypingArea from "./components/TypingArea";
import Results from "./components/Results";
import Theme from "./components/Theme";
import Options from "./components/Options";

import WORDS from "./Words/english.json";

function generateText(wordCount) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    words.push(WORDS[randomIndex]);
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
  let RestrartButton;
  let ThemeBg;
  
  let OptionCorlor

  switch (theme) {
    case '1976':
      bgColor = "bg-[linear-gradient(120deg,_#6ad9c7_0%_20%,_#e94f2e_20%_40%,_#f07c19_40%_60%,_#f7d154_60%_80%,_#4a2c18_80%_100%)]";
      textColor = "text-white";
      hoverTextColor = "hover:text-gray-600";
      containerColor = "bg-[#5b3217]";
      buttonColor = "bg-[#f7d154] hover:bg-[#f07c19]";
      InputColor = "text-[#5cb8a1]";
      ThemeBg = "bg-white/70";
      OptionCorlor = "bg-[#72461d]"
      break;

    case '8008':
      bgColor = "bg-[#3c4756]";
      textColor = "text-[#ac4a6f]";
      hoverTextColor = "hover:text-gray-400";
      containerColor = "bg-[#a2aebd]";
      buttonColor = "bg-[#ac4a6f] hover:bg-[#e94f2e]";
      InputColor = "text-[#ac4a6f]";
      ThemeBg = "bg-[#2c323e]";
      break;

    case '9009':
      bgColor = "bg-[#b6b09a]";
      textColor = "text-[#3a3a3c]";
      hoverTextColor = "hover:text-gray-400";
      containerColor = "bg-[#7f7b77]";
      buttonColor = "bg-[#3a3a3c] hover:bg-[#5c5c5e]";
      InputColor = "text-gray-500";
      ThemeBg = "bg-[#7f7b77]";
      break;

    case 'dots':
      bgColor = "bg-[#191b25]";
      textColor = "text-[#e4c24c]";
      hoverTextColor = "hover:text-gray-400";
      containerColor = "bg-[#1e2030]";
      buttonColor = "bg-[#276e8d] hover:bg-[#299169]";
      InputColor = "text-gray-300";
      RestrartButton = "bg-[#299169] hover:bg-[#e94f2e]"
      ThemeBg = "bg-[#232533]";
      break;

    case 'light':
      bgColor = "bg-white";
      InputColor = "text-gray-700";
      hoverTextColor = "hover:text-gray-600";
      containerColor = "bg-gray-200";
      buttonColor = "bg-black text-white hover:bg-gray-800";
      ThemeBg = "bg-gray-200";
      break;

    case 'gruvbox':
      bgColor = "bg-[#282828]";
      textColor = "text-[#c38c21]";
      hoverTextColor = "hover:text-[#d79921]";
      containerColor = "bg-[#1d2021]";
      buttonColor = "bg-[#c38c21] hover:bg-[#d79921]";
      ThemeBg = "bg-[#3c3836]";
      break;

    case 'leviathan':
      bgColor = "bg-[#182031]";
      textColor = "text-[#96c166]";
      hoverTextColor = "hover:text-[#8ec07c]";
      containerColor = "bg-[#1e2a38]";
      buttonColor = "bg-[#96c166] hover:bg-[#8ec07c]";
      ThemeBg = "bg-[#96c166]";
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
      <Theme theme={theme} setTheme={setTheme} buttonColor={buttonColor} containerColor={containerColor} ThemeBg={ThemeBg} />

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
          RestrartButton={RestrartButton}
          OptionCorlor={OptionCorlor}
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
          OptionCorlor={OptionCorlor}
        />
      )}
    </div>
  );
}

export default App;
