import React from 'react';
import bird from '../../img/bird.jpg'
import './Header.css'

const Header = () => {
    return (
        <div className={'image-container'}>
            <img src={bird} alt={'bird'} width={'100%'}/>
        </div>
    );
};

export default Header;