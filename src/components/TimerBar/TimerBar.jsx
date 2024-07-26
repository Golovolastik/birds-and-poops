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
                const lastClaimTime = Date.parse(data.data);
                const timerFunction = setInterval(function () {
                    const timeFromClaim = new Date().getTime() - lastClaimTime;
                    const hours = Math.floor((timeFromClaim % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - 3;
                    const minutes = Math.floor((timeFromClaim % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeFromClaim % (1000 * 60)) / 1000);
                    if (hours >= 8) {
                        setTimer('Ready');
                        clearInterval(timerFunction);
                    } else {
                        let timer = (7-hours) + ':' + (59-minutes) + ':' + (59-seconds);
                        setTimer(timer);
                    }
                }, 1000);

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
