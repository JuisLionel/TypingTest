
const THEME_COLORS = {
  blue: {
    correct: "text-green-400",
    default: "text-gray-400",
    border: "border-yellow-400",
  },

  gruvbox: {
    correct: "text-[#c38c21]",
    default: "text-gray-300",
    border: "border-[#c38c21]",
  },

  leviathan: {
    correct: "text-[#96c166]",
    default: "text-gray-500",
    border: "border-[#96c166]",
  },

  light: {
    correct: "text-green-600",
    default: "text-gray-600",
    border: "border-yellow-400",
  },
  
  dots: {
    correct: "text-green-400",
    default: "text-gray-500",
    border: "border-yellow-400",
  },
  
};

function WordRenderer({ word, typed = "", isFinal = false, isCurrent = false, theme = "blue" }) {
  const colors = THEME_COLORS[theme] || THEME_COLORS.blue;
  let baseClass = `mr-2 ${colors.default}`;
  if (isCurrent) {
    baseClass += `px-1 border-b-2 ${colors.border}`;
  }

  if (isFinal) {
    return (
      <span className="mr-2">
        {word.split("").map((char, i) => {
          let colorClass = "";
          if (i < typed.length) {
            colorClass = typed[i] === char ? colors.correct : "text-red-400";
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
          let colorClass = colors.default;
          if (i < typed.length) {
            colorClass = typed[i] === char ? colors.correct : "text-red-400";
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
