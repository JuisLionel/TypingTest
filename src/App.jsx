import { useState } from "react";
import TypingArea from "./components/TypingArea";
import Results from "./components/Results";

function App() {
  const text = "asd asd asd asd asd asd asd asd asd";
  const [results, setResults] = useState(null);
  const [show, setShow] = useState(true);

  function handleFinish(stats) {
    setShow(false);
    setTimeout(() => setResults(stats), 300); 
  }

  function handleRestart() {
    setShow(false);
    setTimeout(() => {
      setResults(null);
      setShow(true);
    }, 300);
  }

  return (
    <div className="w-screen h-screen bg-blue-700 flex items-center justify-center">
      <div className="">

      </div>
        {!results ? (
          <TypingArea text={text} onFinish={handleFinish} onRestart={handleRestart} />
        ) : (
          <Results {...results} onRestart={handleRestart} />
        )}
    </div>
  );
}

export default App;
