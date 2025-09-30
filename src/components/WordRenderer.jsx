
const THEME_COLORS = {
  1976: {
    correct: "text-[#e1ba45]",
    incorrect: "text-red-400",
    default: "text-[#5cb8a1]",
    border: "border-purple-400",
  },

  8008: {
    correct: "text-[#ac4a6f]",
    incorrect: "text-red-400",
    default: "text-gray-500",
    border: "border-[#ac4a6f]",
  },

  9009: {
    correct: "text-green-600",
    incorrect: "text-red-400",
    default: "text-gray-500",
    border: "border-purple-400",
  },

  dots: {
    correct: "text-purple-400",
    incorrect: "text-red-400",
    default: "text-gray-500",
    border: "border-purple-400",
  },

  light: {
    correct: "text-green-600",
    incorrect: "text-red-600",
    default: "text-gray-600",
    border: "border-green-400",
  },

  gruvbox: {
    correct: "text-[#c38c21]",
    incorrect: "text-red-600",
    default: "text-gray-600",
    border: "border-[#c38c21]",
  },

  leviathan: {
    correct: "text-[#96c166]",
    incorrect: "text-[#e57373]",
    default: "text-gray-500",
    border: "border-[#96c166]",
  },

  blue: {
    correct: "text-green-400",
    incorrect: "text-red-400",
    default: "text-gray-400",
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
            colorClass = typed[i] === char ? colors.correct : colors.incorrect;
          } else {
            colorClass = colors.incorrect;
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
              <span key={`extra-${idx}`} className={colors.incorrect}>
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
            colorClass = typed[i] === char ? colors.correct : colors.incorrect;
          }
          return (
            <span key={i} className={colorClass}>
              {char}
            </span>
          );
        })}
        {/* Show extra characters while typing */}
        {typed.length > word.length &&
          typed
            .slice(word.length)
            .split("")
            .map((ch, idx) => (
              <span key={`extra-current-${idx}`} className={colors.incorrect}>
                {ch}
              </span>
            ))}
      </span>
    );
  }

  return <span className={baseClass}>{word}</span>;
}

export default WordRenderer;
