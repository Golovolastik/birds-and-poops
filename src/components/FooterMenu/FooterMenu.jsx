import React from 'react';
import './FooterMenu.css'
import {Link, Route, Routes} from "react-router-dom";

const FooterMenu = () => {
    return (
        <div className={'footer-menu'}>
            <div>friends</div>
            <Link to="/tasks">tasks</Link>
            <Link to="/">farm</Link>
            <div>leaderboard</div>
        </div>
    );
};

export default FooterMenu;