import React, { useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const logoDropdown = useRef(null)

  useEffect(() => {  
    window.addEventListener('click', (e) => {
      if(!e.target.closest('#extendableLogo')) {
        document.getElementById('logoDropdown').classList.add('hidden');
      } else {
        document.getElementById('logoDropdown').classList.remove('hidden');
      }
    });
  });

  const toggleLogoDropdown = (e) => {
    const classes = logoDropdown.current.classList;
    classes.contains('hidden') ? classes.remove('hidden') : classes.add('hidden');
    e.stopPropagation();
  }
  
  return (
    <header>
      <div id='extendableLogo'>
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
