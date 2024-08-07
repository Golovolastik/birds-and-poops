import React, { useEffect, useState } from 'react';

const TimerBar = ({ onTimerEnd, lastClaim }) => {
    const [timer, setTimer] = useState('Loading');

    useEffect(() => {
        let timerFunction;

        const fetchTimer = async () => {
            try {

                const lastClaimTime = Date.parse(lastClaim);

                timerFunction = setInterval(() => {
                    const now = new Date();
                    const timeFromClaim = now - new Date(lastClaimTime);
                    const hours = Math.floor((timeFromClaim / 3_600_000) - 3);
                    const minutes = Math.floor((timeFromClaim % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeFromClaim % (1000 * 60)) / 1000);

                    if (hours >= 8) {
                        setTimer('Ready');
                        clearInterval(timerFunction);
                        onTimerEnd();
                    } else {
                        const formattedTimer =
                            `${7 - hours}`.padStart(2, '0') + ':'
                            + `${59 - minutes}`.padStart(2, '0') + ':'
                            + `${59 - seconds}`.padStart(2, '0');
                        setTimer(formattedTimer);
                    }
                }, 1000);
            } catch (error) {
                console.error('Error fetching time: ', error);
                setTimer('Error');
            }
        };
        fetchTimer();

        // Cleanup interval on component unmount or user change
        return () => clearInterval(timerFunction);

    }, [lastClaim, onTimerEnd]);

    return (
        <div className={'timer-bar'}>
            {timer}
        </div>
    );
};

export default TimerBar;
