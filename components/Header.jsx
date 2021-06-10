import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactModal from 'react-modal';
import Image from 'next/image';
import classes from "../lib/classes";

const Header = () => {
    const [ expanded, setExpanded ] = useState(false);
    const [ isRulesModalOpen, setIsRulesModalOpen ] = useState(false);

    useEffect(() => {
        const onBodyClick = (event) => {
            if (!event.target.closest(".app-header")) {
                setExpanded(false);
            }
        };

        document.body.addEventListener("click", onBodyClick);

        return () => document.body.removeEventListener("click", onBodyClick);
    }, []);
    
    const handleOpenRulesModal = () => {
        setIsRulesModalOpen(true);
    }

    const handleCloseRulesModal = () => {
        setIsRulesModalOpen(false);
    }

    const logoClassName = classes({
        "expanded": expanded
    });
    const dropdownClassName = classes({
        "hidden": !expanded
    });

    return (
        <header className="app-header flex" onClick={ () => setExpanded(true) }>
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
                    <div onClick={ handleOpenRulesModal }>Rules</div>
                    <RulesModal isOpen={isRulesModalOpen} close={handleCloseRulesModal}/>
                    <Link href='/rooms'><div>Rooms</div></Link>
                </div>
            </div>
        </header>
    );
};

const RulesModal = (props) => {
    return (
        <ReactModal
        id={'rulesModal'}
        isOpen={props.isOpen}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onRequestClose={props.close}>
            <div className='rulesHorizontalSection'>
                <Image 
                    src='/img/example-image-with-red-circles.png'
                    width={230}
                    height={230}
                    layout='intrinsic'
                    className='border-2px-red'
                />
                <span>
                    <span>Try to</span>
                    <span className='under-text__accent underline-text'> find </span>
                    <span className='underline-text'>any objects on the images</span>
                </span>
            </div>
            <div className='rulesHorizontalSection'>
                <span>
                    <span className='under-text__accent underline-text'>&nbsp;Judge </span>
                    <span className='underline-text'>other player’s suggestions</span>
                </span>
                <Image
                    src='/img/example-players-list.png' 
                    width={238}
                    height={82}
                    layout='intrinsic'
                />
            </div>
            <div className='rulesVerticalSection'>
                <Image
                    src='/img/example-players-with-winner.png'
                    width={392}
                    height={82}
                    layout='intrinsic'
                />
                <span>
                    <span className='underline-text'>The player with the highest agreed on suggestions</span>
                    <span className='under-text__accent underline-text'> wins &nbsp;</span>
                </span>
            </div>
        </ReactModal>
    );
}

export default Header;
