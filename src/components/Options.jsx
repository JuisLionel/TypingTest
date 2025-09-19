export default function Options({ TopSpeed, time, setWordCount, generateText, wordCount, setText, inputRef, handleRestart }) {
  const options = [10, 25, 50, 100, 250];

  return (
    <div className="flex justify-center sm:justify-between items-center w-[95%] max-w-4xl text-white">
      <div className="flex gap-2">
        {options.map((num, index) => (
          <>
            <button
              onClick={() => {
                setWordCount(num);
                handleRestart()
                setText(generateText(num))
                setTimeout(() => inputRef.current?.focus(), 0);
              }}

              className={`transition-all duration-150 ease-in-out hidden sm:inline 
                ${wordCount === num
                  ? "font-bold underline text-white"
                  : "hover:text-gray-400 hover:underline"
                }`}
            >
              {num}
            </button>

            {index !== options.length - 1 && <span className="mx-1 hidden sm:block">/</span>}
          </>
        ))}
      </div>

      <div className="">
        Top speed: {TopSpeed} / Time: {(time / 1000).toFixed(1)}s
      </div>
    </div>
  );
}
