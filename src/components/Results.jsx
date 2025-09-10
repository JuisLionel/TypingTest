import { calculateStats } from "../utils/calculateStats";
import { useState } from "react";

function Results({ correctChars, wrongChars, correctWords, startTime, endTime, onRestart }) {
  const [ Conversion, setConversion ] = useState(true)

  const { timeTaken, accuracy, wpm } = calculateStats({
    correctChars,
    wrongChars,
    correctWords,
    startTime,
    endTime,
  });



  return (
    <div className="flex w-[900px] h-[500px] bg-blue-900 rounded p-6 text-white gap-6">
      {/* Stats Panel */}
      <div className="flex flex-col justify-start gap-4 w-[250px]">
        <div onClick={() => setConversion(!Conversion)} className="bg-blue-700 p-4 rounded hover:scale-102 transition-all ease-linear duration-100 active:scale-98">
          <p className="text-sm">⚡ {Conversion ? "WPM" : "CPM"}</p>
          <p className="text-2xl font-bold">{Conversion ? wpm : wpm * 5}</p>
        </div>

        <div className="bg-blue-700 p-4 rounded hover:scale-102 transition-all ease-linear duration-100">
          <p className="text-sm">🎯 Accuracy</p>
          <p className="text-2xl font-bold">{accuracy}%</p>
        </div>

        <div className="bg-blue-700 p-4 rounded hover:scale-102 transition-all ease-linear duration-100">
          <p className="text-sm">⏱ Time</p>
          <p className="text-2xl font-bold">{timeTaken.toFixed(1)}s</p>
        </div>

        <div className="bg-blue-700 p-4 rounded hover:scale-102 transition-all ease-linear duration-100">
          <p className="text-sm">❌ Mistakes</p>
          <p className="text-2xl font-bold">{ wrongChars}</p>
        </div>

        <button
          onClick={onRestart}
          className="mt-4 bg-blue-700 hover:scale-102 transition-all ease-linear duration-100 px-4 py-2 rounded text-white"
        >
          Restart
        </button>
      </div>

      <div className="flex-1 bg-blue-700 rounded p-4">

      </div>
    </div>
  );
}

export default Results;
