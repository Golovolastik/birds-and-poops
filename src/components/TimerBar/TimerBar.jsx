import React, { useState, useEffect } from 'react';
import './TimerBar.css'

const TimerBar = ({ initialTime }) => {
    const [time, setTime] = useState(initialTime);
    const [status, setStatus] = useState('Running');

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setStatus('Completed');
        }
    }, [time]);

    return (
        <div className={'container'}>
            <div className={'status'}>{status}</div>
            <div className={'timer'}>{time} seconds remaining</div>
        </div>
    );
};


export default TimerBar;
