import { useState } from "react";

import { IoClose } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

function Menu({ }) {
    const [Open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(!Open)}
                className={`group absolute w-[50px] h-[50px] top-4 bg-orange-500 text-white text-4xl grid place-items-center z-100 rounded hover:scale-105 hover:bg-orange-600 active:scale-98 transition-all duration-130 ease-linear ${Open ? "left-82" : "left-4"}`}
            >
                {Open ? <IoClose /> : <IoSettingsSharp className="group-hover:rotate-360 transition-transform duration-300" />}
            </button>


            <div className={`${Open ? "OpenMenu" : "CloseMenu"} w-[400px] h-full bg-red-900 absolute left-0 p-2`}>
            </div>
        </>
    );
}

export default Menu;
