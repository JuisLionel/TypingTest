export function calculateStats({ correctChars, wrongChars, correctWords, time }) {
  const timeTaken = time / 1000; 
  const totalChars = correctChars + wrongChars;
  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
  const wpm = timeTaken > 0 ? Math.round((correctWords) / (timeTaken / 60)) : 0;

  return {
    timeTaken,
    totalChars,
    accuracy,
    wpm,
  };
}
