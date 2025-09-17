import { useState } from "react";

import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function Menu({ TopSpeed }) {
    const [Open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(!Open)}
                className="absolute w-[50px] h-[50px] top-4 left-4 bg-orange-500 text-white text-4xl grid place-items-center z-100 rounded hover:scale-105 hover:bg-orange-600 active:scale-98 transition-all ease-linear"
            >
                {Open ? <IoMenu /> : <IoClose />}
            </button>


            <div className={`${Open ? "OpenMenu" : "CloseMenu"} `}>

            </div>
        </>
    );
}

export default Menu;
