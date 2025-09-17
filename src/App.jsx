import { useState } from "react";

import TypingArea from "./components/TypingArea";
import Results from "./components/Results";
import Menu from "./components/Menu";

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
  const [wordCount, setWordCount] = useState(20);
  const [text, setText] = useState(generateText(wordCount));

  const [TopSpeed, setTopSpeed] = useState(0)
  const [openTyping, setOpenTyping] = useState(true);
  const [openResult, setOpenResult] = useState(false);

  function handleFinish(stats) {
    setResults(stats);
    setOpenTyping(false);
    setOpenResult(true);
  }

  function handleRestart() {
    setResults(null);
    setOpenTyping(true)
    setOpenResult(false)
    setText(generateText(wordCount));
  }

  console.log(results)

  return (
    <div className="w-screen h-screen bg-blue-700 flex flex-col items-center justify-center gap-4">
      <Menu TopSpeed={TopSpeed} />


      {!results ? (
        <>
          <TypingArea openTyping={openTyping} wordCount={wordCount} generateText={generateText} setText={setText} text={text} onFinish={handleFinish} onRestart={handleRestart} />
        </>
      ) : (
        <Results {...results} openResult={openResult} setTopSpeed={setTopSpeed} TopSpeed={TopSpeed} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
