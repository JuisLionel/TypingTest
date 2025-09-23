import { useState, useEffect } from "react";

import { IoClose } from "react-icons/io5";
import { FaPaintBrush } from "react-icons/fa";

function Theme({ }) {
    const [Open, setOpen] = useState(false);

    const ThemeValue = [
        { name: "dark", color: 'text-white bg-gray-500' },
        { name: "blue", color: 'text-white bg-blue-500' },
        { name: "light", color: 'bg-white' }, { name: "dark", color: 'text-white bg-gray-500' },
        { name: "blue", color: 'text-white bg-blue-500' },
        { name: "light", color: 'bg-white' }, { name: "dark", color: 'text-white bg-gray-500' },
        { name: "blue", color: 'text-white bg-blue-500' },
        { name: "light", color: 'bg-white' }, { name: "dark", color: 'text-white bg-gray-500' },
        { name: "blue", color: 'text-white bg-blue-500' },
        { name: "light", color: 'bg-white' }, { name: "dark", color: 'text-white bg-gray-500' },
        { name: "blue", color: 'text-white bg-blue-500' },
        { name: "light", color: 'bg-white' }, { name: "dark", color: 'text-white bg-gray-500' },
        { name: "blue", color: 'text-white bg-blue-500' },
        { name: "light", color: 'bg-white' },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(!Open)}
                className={`group absolute w-[50px] h-[50px] top-4 bg-orange-500 text-white text-4xl grid place-items-center z-100 rounded hover:scale-105 hover:bg-orange-600 active:scale-98 transition-all duration-130 ease-linear ${Open ? "left-105" : "left-4"}`}
            >
                {Open ? <IoClose /> : <FaPaintBrush className="group-hover:rotate-90 transition-transform duration-300" />}
            </button>


            <div className={`${Open ? "OpenMenu" : "CloseMenu"} w-[400px] h-full bg-blue-900 absolute left-0 p-4 overflow-x-auto thin-scrollbar`}>
                {ThemeValue.map((item, index) => (
                    <div key={index} className={`${item.color} w-full h-[130px] rounded mb-[27px] text-4xl flex justify-center items-center hover:scale-102 active:scale-95 transition-all duration-100 ease-in-out ScrollAnimation`}>
                        <h1>{item.name}</h1>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Theme;
