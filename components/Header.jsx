import React, { useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const logoDropdown = useRef(null)
  useEffect(() => {  
    if(logoDropdown.current.style.visibility !=='hidden'){
    window.addEventListener('click', (e) => toggleLogoDropdown(e)
      // If the event is not stopped
      // during bubbling (i.e. event doesn't come from logo)
      // hide the logo dropdown
    )};
  }, []);
  const toggleLogoDropdown = (e) => {
    const classes = logoDropdown.current.classList
    classes.contains('hidden') ? classes.remove('hidden') : classes.add('hidden') 
    e.stopPropagation();
  }
  
  return (
    <header>
      <div id='extendableLogo' onClick={(e) => toggleLogoDropdown(e)}>
        <div id='extendableLogoFirstWord'>
          <span className='extendableLogoFirstLetterInWord'>O</span>
          <span>peration</span>
        </div>
        <div id='extendableLogoSecondWord'>
          <span className='extendableLogoFirstLetterInWord'>R</span>
          <span>eact</span>
        </div>
        <div id='logoDropdown' className='hidden' ref={logoDropdown}>
          <Link href='/'><div>Home</div></Link>
          <div>Rules</div>
          <Link href='/rooms'><div>Rooms</div></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;