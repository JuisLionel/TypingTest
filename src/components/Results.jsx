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
  bgColor,
  textColor,
  containerColor,
  OptionCorlor
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

  const stats = [
    {
      key: 'wpm',
      icon: '⚡',
      label: ConversionWPM ? 'WPM' : 'CPM',
      value: ConversionWPM ? wpm : wpm * 5,
      onClick: () => setConversionWPM(!ConversionWPM),
      clickable: true,
    },
    {
      key: 'accuracy',
      icon: '🎯',
      label: 'Accuracy',
      value: `${accuracy}%`,
    },
    {
      key: 'time',
      icon: '⏱',
      label: 'Time',
      value: `${timeTaken.toFixed(1)}s`,
    },
    {
      key: 'correctWords',
      icon: '✅️',
      label: 'Correct Words',
      value: `${correctWords}/${wordCount}`,
    },
  ];

  return (
    <div className={`flex flex-col sm:flex-row w-[95%] max-w-4xl min-h-[500px] ${containerColor} rounded p-4 ${textColor} gap-6 ${openResult ? "Open" : "Close"}`}>
      <div className="flex flex-col sm:w-[250px] gap-4">
        {stats.map((stat) => (
          <div
            key={stat.key}
            onClick={stat.clickable ? stat.onClick : undefined}
            className={`${OptionCorlor ? OptionCorlor : bgColor} w-full h-[80px] flex flex-col justify-center rounded hover:scale-102 p-3 transition-all ease-linear duration-100 active:scale-98${stat.clickable ? ' cursor-pointer' : ''}`}
          >
            <p className="text-sm">{stat.icon} {stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
        <button
          onClick={onRestart}
          className={`mt-10 ${OptionCorlor ? OptionCorlor : bgColor} hover:scale-102 active:scale-98 transition-all ease-linear duration-100 px-4 py-2 rounded ${textColor} w-full sm:w-auto`}
        >
          Restart
        </button>
      </div>

      <div className={`flex-1 ${OptionCorlor ? OptionCorlor : bgColor} rounded p-4 hidden sm:block`}></div>
    </div>
  );
}

export default Results;
