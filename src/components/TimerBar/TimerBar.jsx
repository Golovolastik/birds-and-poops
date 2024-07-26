import React, { useState, useEffect } from 'react';
import './TimerBar.css';
import {useTelegram} from "../../hooks/useTelegram";

const TimerBar = ({ setStatus }) => {
    const {user} = useTelegram();
    const [timer, setTimer] = useState('Loading');

    useEffect(() => {
        let timerFunction;

        const fetchTimer = async () => {
            try {
                const response = await fetch('https://potty-pals.fun/api/last-claim-time', {
                    headers: {
                        user: user?.id,
                    }
                });

                const data = await response.json();
                const lastClaimTime = Date.parse(data.data);
                setStatus('Running');

                timerFunction = setInterval(() => {
                    const timeFromClaim = new Date().getTime() - lastClaimTime;
                    const hours = Math.floor((timeFromClaim % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) - 3;
                    const minutes = Math.floor((timeFromClaim % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeFromClaim % (1000 * 60)) / 1000);

                    if (hours >= 8) {
                        setStatus('Ready');
                        setTimer('Ready');
                        clearInterval(timerFunction);
                    } else {
                        const formattedTimer = `${7 - hours}:${59 - minutes}:${59 - seconds}`;
                        setTimer(formattedTimer);
                    }
                }, 1000);
            } catch (error) {
                console.error('Error fetching time: ', error);
            }
        };

        if (user?.id) {
            fetchTimer();
        }

        // Cleanup interval on component unmount or user change
        return () => clearInterval(timerFunction);

    }, [user, setStatus]);
}
export default TimerBar;
