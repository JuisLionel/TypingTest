function WordRenderer({ word, typed = "", isFinal = false, isCurrent = false }) {
  let baseClass = "mr-2 text-gray-400";
  if (isCurrent) {
    baseClass += "px-1 border-b-2 border-yellow-400"; 
  }

  if (isFinal) {
    return (
      <span className="mr-2">
        {word.split("").map((char, i) => {
          let colorClass = "";
          if (i < typed.length) {
            colorClass = typed[i] === char ? "text-green-400" : "text-red-400";
          } else {
            colorClass = "text-red-400"; 
          }
          return (
            <span key={i} className={colorClass}>
              {char}
            </span>
          );
        })}
        {typed.length > word.length &&
          typed
            .slice(word.length)
            .split("")
            .map((ch, idx) => (
              <span key={`extra-${idx}`} className="text-red-400">
                {ch}
              </span>
            ))}
      </span>
    );
  }

  if (isCurrent) {
    return (
      <span className={baseClass}>
        {word.split("").map((char, i) => {
          let colorClass = "text-white";
          if (i < typed.length) {
            colorClass = typed[i] === char ? "text-green-400" : "text-red-400";
          }
          return (
            <span key={i} className={colorClass}>
              {char}
            </span>
          );
        })}
      </span>
    );
  }

  return <span className={baseClass}>{word}</span>;
}

export default WordRenderer;
