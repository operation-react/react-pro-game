import React, { useEffect } from "react";
import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "../lib/fetchJson";

const Header = () => {
  useEffect(() => {
    window.addEventListener('click', (e) => {
      let logoDropdown = document.getElementById('logoDropdown');
      // If the event is not stopped
      // during bubbling (i.e. event doesn't come from logo)
      // hide the logo dropdown
      logoDropdown.style.visibility = 'hidden';
    });
  });

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
        <div id='logoDropdown'>
          <div><Link href='/'>Home</Link></div>
          <div>Rules</div>
          <div><Link href='/rooms'>Rooms</Link></div>
        </div>
      </div>
    </header>
  );
};

const toggleLogoDropdown = (logoClickEvent) => {
  toggleVisibility(document.getElementById('logoDropdown'));

  logoClickEvent.stopPropagation();
}

const toggleVisibility = (element) => {
  element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

export default Header;
