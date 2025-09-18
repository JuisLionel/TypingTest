export default function Options({ TopSpeed, time, setWordCount, generateText, wordCount, setText, inputRef }) {
  const options = [10, 25, 50, 100, 250];

  return (
    <div className="flex justify-between items-center w-full max-w-lg mx-auto mb-0 text-white">
      <div className="flex gap-2">
        {options.map((num, index) => (
          <>
            <button
              onClick={() => {
                setWordCount(num);
                setText(generateText(num));
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
              className={`transition-all duration-150 ease-in-out ${wordCount === num
                ? "font-bold underline text-white"
                : "hover:text-black hover:underline"
                }`}
            >
              {num}
            </button>

            {index !== options.length - 1 && <span className="mx-1">/</span>}
          </>
        ))}
      </div>

      <div className="">
        Top speed: {TopSpeed} / Time: {(time / 1000).toFixed(1)}s
      </div>
    </div>
  );
}
