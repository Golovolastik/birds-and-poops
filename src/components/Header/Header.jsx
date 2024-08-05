import React from 'react';
import tonIcon from '../../img/ton_icon.png'
import './Header.css'

const Header = () => {
    return (
        <div className={'header-container'}>
            <span>BIRDZ'N'POOPZ</span>
            <button className={'ton-connect-button'}>
                <img src={tonIcon} alt={'ton connect'} className={'ton-connect-icon'}/>
            </button>
        </div>

    );
};

export default Header;