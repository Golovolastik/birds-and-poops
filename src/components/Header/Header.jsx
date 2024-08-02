import React from 'react';
import tonIcon from '../../img/ton_icon.png'
import titleImage from '../../img/app_title.png'
import './Header.css'

const Header = () => {
    return (
        <div className={'header-container'}>
            <img src={titleImage} alt={'birds and poops'} className={'title-image'}/>
            <button className={'ton-connect-button'}>
                <img src={tonIcon} alt={'ton connect'} className={'ton-connect-icon'}/>
            </button>
        </div>

    );
};

export default Header;