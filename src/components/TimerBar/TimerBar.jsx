import React, { useState, useEffect } from 'react';
import './TimerBar.css';

const TimerBar = ({ setStatus }) => {
    const [time, setTime] = useState(null);
    const [timerStatus, setTimerStatus] = useState('Loading...');

    useEffect(() => {
        fetch('https://potty-pals.fun/api/last-claim-time')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const lastClaimTime = new Date(data.data);
                const currentTime = new Date();
                const timeDiff = (currentTime - lastClaimTime) / 1000;

                if (timeDiff < 3600) {
                    setTime(3600 - timeDiff);
                    setTimerStatus('Running');
                } else {
                    setTime(0);
                    setTimerStatus('Ready to claim');
                }
            })
            .catch(error => {
                console.error('Error fetching last claim time:', error);
                setTimerStatus('Error');
            });
    }, [setStatus]);

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (time <= 0 && timerStatus === 'Running') {
            setTimerStatus('Ready to claim');
        }
    }, [time, timerStatus]);

    useEffect(() => {
        setStatus(timerStatus); // Обновляем статус в родительском компоненте
    }, [timerStatus, setStatus]);

    return (
        <div>
            {time > 0 ? (
                <div className={'timer'}>{Math.floor(time / 60)} minutes {Math.floor(time % 60)} seconds remaining</div>
            ) : (
                <div className={'timer'}>Ready to claim</div>
            )}
        </div>
    );
};

export default TimerBar;
