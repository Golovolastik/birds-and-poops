import React, { useState, useEffect } from 'react';
import './TimerBar.css';
import {useTelegram} from "../../hooks/useTelegram";

const TimerBar = ({ setStatus }) => {
    const { user } = useTelegram();
    const [timer, setTimer] = useState('Loading');

    useEffect( () => {
        const fetchTimer = async () => {
            try {
                const response = await fetch('https://potty-pals.fun/api/last-claim-time', {
                    headers: {
                        user: user?.id,
                    }
                });
                const data = await response.json();
                const timeFromClaim = new Date().getTime() - Date.parse(data.data);
                const hours = Math.floor((timeFromClaim % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - 3;
                const minutes = Math.floor((timeFromClaim % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeFromClaim % (1000 * 60)) / 1000);
                console.log(timeFromClaim);
                if (hours > 8) {
                    setTimer('Ready');
                } else {
                    let timer = (7-hours) + ':' + (60-minutes) + ':' + (60-seconds);
                    setTimer(timer);
                }
            } catch (error) {
                console.error('Error fetching time: ', error);
            }
        }
        if (user?.id) {
            fetchTimer();
        }
    }, [user]);

    return (
        <div className={'timer'}>
            {timer}
        </div>
        // <div>
        //     {time > 0 ? (
        //         <div className={'timer'}>{Math.floor(time / 60)} minutes {Math.floor(time % 60)} seconds remaining</div>
        //     ) : (
        //         <div className={'timer'}>Ready to claim</div>
        //     )}
        // </div>
    );
};

export default TimerBar;
