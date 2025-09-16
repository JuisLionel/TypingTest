import { useState, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // time in ms
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

  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Stopwatch</h1>
      <div className="text-5xl font-mono mb-6">{formatTime(time)}</div>
      <div className="flex gap-4">
        <button
          onClick={start}
          className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={stop}
          className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
