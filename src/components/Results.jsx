import { calculateStats } from "../utils/calculateStats";
import { useState, useEffect } from "react";

function Results({
  correctChars,
  wrongChars,
  correctWords,
  time,
  onRestart,
  TopSpeed,
  setTopSpeed,
  openResult,
  wordCount,
}) {
  const [ConversionWPM, setConversionWPM] = useState(true);

  const { timeTaken, accuracy, wpm } = calculateStats({
    correctChars,
    wrongChars,
    correctWords,
    time,
  });

  useEffect(() => {
    if (wpm > TopSpeed) {
      setTopSpeed(wpm);
    }
  }, [wpm, TopSpeed, setTopSpeed]);

  return (
    <div className={`flex flex-col sm:flex-row w-[95%] max-w-4xl min-h-[500px] bg-blue-900 rounded p-4 text-white gap-6 ${openResult ? "Open" : "Close"}`}>
      <div className="flex flex-col sm:w-[250px] gap-4">
        <div
          onClick={() => setConversionWPM(!ConversionWPM)}
          className="bg-blue-700 w-full h-[80px] flex flex-col justify-center rounded hover:scale-102 p-3 transition-all ease-linear duration-100 active:scale-98"
        >
          <p className="text-sm">⚡ {ConversionWPM ? "WPM" : "CPM"}</p>
          <p className="text-2xl font-bold">{ConversionWPM ? wpm : wpm * 5}</p>
        </div>

        <div className="bg-blue-700 w-full h-[80px] flex flex-col justify-center rounded hover:scale-102 p-3 transition-all ease-linear duration-100">
          <p className="text-sm">🎯 Accuracy</p>
          <p className="text-2xl font-bold">{accuracy}%</p>
        </div>

        <div className="bg-blue-700 w-full h-[80px] flex flex-col justify-center rounded hover:scale-102 p-3 transition-all ease-linear duration-100">
          <p className="text-sm">⏱ Time</p>
          <p className="text-2xl font-bold">{timeTaken.toFixed(1)}s</p>
        </div>

        <div className="bg-blue-700 w-full h-[80px] flex flex-col justify-center rounded hover:scale-102 p-3 transition-all ease-linear duration-100">
          <p className="text-sm">✅️ Correct Words</p>
          <p className="text-2xl font-bold">
            {correctWords}/{wordCount}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="mt-10 bg-blue-700 hover:scale-102 active:scale-98 transition-all ease-linear duration-100 px-4 py-2 rounded text-white w-full sm:w-auto"
        >
          Restart
        </button>
      </div>

      {/* RIGHT COLUMN (Extra space or future stats) */}
      <div className="flex-1 bg-blue-700 rounded p-4 hidden sm:block"></div>
    </div>
  );
}

export default Results;
