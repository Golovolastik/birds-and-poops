import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram'

const TimerBar = ({ onTimerEnd }) => {
    const { user } = useTelegram();
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

                if (!response.ok) {
                    throw new Error('Failed to fetch last claim time');
                }

                const data = await response.json();
                const lastClaimTime = Date.parse(data.data);

                timerFunction = setInterval(() => {
                    const now = new Date();
                    const timeFromClaim = now - new Date(lastClaimTime);
                    console.log(`Time from last claim: ${timeFromClaim}`);
                    const hours = Math.floor((timeFromClaim / 3_600_000) - 3);
                    console.log(`Hours from last claim: ${hours}`);
                    const minutes = Math.floor((timeFromClaim % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeFromClaim % (1000 * 60)) / 1000);

                    if (hours >= 8) {
                        setTimer('Ready');
                        clearInterval(timerFunction);
                        onTimerEnd();
                    } else {
                        const formattedTimer = `${7 - hours}:${59 - minutes}:${59 - seconds}`;
                        setTimer(formattedTimer);
                    }
                }, 1000);
            } catch (error) {
                console.error('Error fetching time: ', error);
                setTimer('Error');
            }
        };

        if (user?.id) {
            fetchTimer();
        }

        // Cleanup interval on component unmount or user change
        return () => clearInterval(timerFunction);

    }, [user, onTimerEnd]);

    return (
        <div className={'timer-bar'}>
            {timer}
        </div>
    );
};

export default TimerBar;
