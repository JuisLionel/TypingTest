export function calculateStats({ correctChars, wrongChars, correctWords, startTime, endTime }) {
  const timeTaken = (endTime - startTime) / 1000; // seconds
  const totalChars = correctChars + wrongChars;
  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
  const wpm = timeTaken > 0 ? Math.round((correctChars / 5) / (timeTaken / 60)) : 0;

  return {
    timeTaken,
    totalChars,
    accuracy,
    wpm,
  };
}
