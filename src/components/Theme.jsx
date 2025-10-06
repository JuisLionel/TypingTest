import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaPaintBrush } from "react-icons/fa";

function Theme({ theme, setTheme, buttonColor, ThemeBg }) {
  const [Open, setOpen] = useState(false);

  const ThemeValue = [
    { name: "1976", color: "bg-[linear-gradient(120deg,_#6ad9c7_0%_20%,_#e94f2e_20%_40%,_#f07c19_40%_60%,_#f7d154_60%_80%,_#4a2c18_80%_100%)] text-black"},
    { name: "8008", color: "bg-[#3c4756] text-[#ac4a6f]" },
    { name: "9009", color: "bg-[#b6b09a] text-[#3a3a3c]" },
    { name: "dots", color: "bg-[#191b25]" },
    { name: "light", color: "bg-white text-black" },
    { name: "gruvbox", color: "bg-[#282828] text-[#c38c21]" },
    { name: "leviathan", color: "bg-[#182031] text-[#96c166]" },
    { name: "blue", color: "bg-blue-600 text-orange-500" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleThemeChange = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!Open)}
        className={`group absolute w-[50px] h-[50px] top-4 ${buttonColor} text-white text-4xl grid place-items-center z-100 rounded hover:scale-105 active:scale-98 transition-all duration-130 ease-linear ${Open ? "left-105" : "left-4"}`}
      >
        {Open ? <IoClose /> : <FaPaintBrush className="group-hover:rotate-90 transition-transform duration-300" />}
      </button>

      <div className={`${Open ? "OpenMenu" : "CloseMenu"} shadow-lm w-[400px] h-full ${ThemeBg} absolute left-0 p-4 overflow-x-auto thin-scrollbar`}>
        {ThemeValue.map((item, index) => (
          <div
            key={index}
            onClick={() => handleThemeChange(item.name)}
            className={`${item.color} w-full h-[130px] rounded ${item.name !== "blue" && "mb-[27px]"} text-4xl flex justify-center items-center hover:scale-102 active:scale-95 transition-all duration-100 ease-in-out ScrollAnimation ${theme === item.name ? "ring-4 ring-orange-500" : "shadow-[0_0_10px_rgba(0,0,0,0.3)]"}`}
          >
            <h1>
              {item.name === "dots" ? (
                <>
                  <span style={{ color: "#ac383f" }}>d</span>
                  <span style={{ color: "#276e8d" }}>o</span>
                  <span style={{ color: "#299169" }}>t</span>
                  <span style={{ color: "#e4c24c" }}>s</span>
                </>
              ) : (
                item.name
              )}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default Theme;
