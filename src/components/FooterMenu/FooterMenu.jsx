import React from 'react';
import './FooterMenu.css'
import {Link} from "react-router-dom";

const FooterMenu = () => {
    return (
        <div className={'footer-menu'}>
            <div>friends</div>
            <Link to="/tasks" className={'footer-link'}>tasks</Link>
            <Link to="/" className={'footer-link'}>farm</Link>
            <div>leaderboard</div>
        </div>
    );
};

export default FooterMenu;