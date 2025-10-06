export default function Options({ TopSpeed, time, setWordCount, generateText, wordCount, setText, inputRef, handleRestart, textColor, hoverTextColor }) {
  const options = [10, 25, 50, 100, 250];

  return (
    <div className={`flex justify-center sm:justify-between items-center w-[95%] max-w-4xl ${textColor}`}>
      <div className={`flex gap-2`}>
        {options.map((num, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => {
                setWordCount(num);
                handleRestart()
                setText(generateText(num))
                setTimeout(() => inputRef.current?.focus(), 0);
              }}

              className={`transition-all duration-150 ease-in-out hidden sm:inline 
                ${wordCount === num
                  ? `font-bold underline ${textColor}`
                  : `${hoverTextColor} hover:underline`
                }`}
            >
              {num}
            </button>

            {index !== options.length - 1 && <span className="mx-1 hidden sm:block">/</span>}
          </div>
        ))}
      </div>

      <div className="">
        Top speed: {TopSpeed} / Time: {(time / 1000).toFixed(1)}s
      </div>
    </div>
  );
}
