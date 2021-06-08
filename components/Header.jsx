import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import classes from "../lib/classes";

const Header = () => {
    const [ expanded, setExpanded ] = useState(false);

    useEffect(() => {
        const onBodyClick = (event) => {
            if (!event.target.closest(".app-header")) {
                setExpanded(false);
            }
        };

        document.body.addEventListener("click", onBodyClick);

        return () => document.body.removeEventListener("click", onBodyClick);
    }, []);

    const logoClassName = classes({
        "expanded": expanded
    });
    const dropdownClassName = classes({
        "hidden": !expanded
    });

    return (
        <header className="app-header" onClick={ () => setExpanded(true) }>
            <div id='extendableLogo' className={ logoClassName }>
                <div id='extendableLogoFirstWord'>
                    <span className='extendableLogoFirstLetterInWord'>O</span>
                    <span>peration</span>
                </div>
                <div id='extendableLogoSecondWord'>
                    <span className='extendableLogoFirstLetterInWord'>R</span>
                    <span>eact</span>
                </div>
                <div id='logoDropdown' className={ dropdownClassName }>
                    <Link href='/'><div>Home</div></Link>
                    <div>Rules</div>
                    <Link href='/rooms'><div>Rooms</div></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
