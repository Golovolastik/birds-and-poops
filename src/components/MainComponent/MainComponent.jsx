import React, {useEffect, useState} from 'react';
import TimerBar from "../TimerBar/TimerBar";
import ClaimButton from '../ClaimButton/ClaimButton';
import {useTelegram} from "../../hooks/useTelegram";
import './MainComponent.css';
import Points from "../Points/Points";
import '../Points/Points.css';


const MainComponent = () => {
    const {user} = useTelegram();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [timerKey, setTimerKey] = useState(0);
    const [lastClaim, setLastClaim] = useState(0);
    const [points, setPoints] = useState(0);
    const handleButtonClick = async () => { // Добавляем async
        try {
            const response = await fetch('https://potty-pals.fun/api/claim', {
                headers: {
                    user: user?.id,
                }
            });

            if (response.ok) {
                console.log('Claim successful');
                setPoints(data.points);
                setIsButtonDisabled(true);
                setTimerKey(prevKey => prevKey + 1);
                // Дополнительная логика при успешном выполнении
            } else {
                console.error('Failed to claim');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://potty-pals.fun/api/get-state`, {
                    headers: {
                        user: user?.id,
                    }
                });
                const data = await response.json();
                setPoints(data.points);
                setLastClaim(data.date);
            } catch (error) {
                console.error('Error fetching points:', error);
            }
        };

        if (user?.id) {
            fetchUserData();
        }
    }, [user]);


    const handleTimerEnd = () => {
        setIsButtonDisabled(false);
    };

    return (
        <div className={'container'}>
            <Points points={points}/>
            <span className={'userId'}>
                Hi! {user?.username}
            </span>
            <TimerBar key={timerKey} onTimerEnd={handleTimerEnd} lastClaim={lastClaim}/>
            <ClaimButton onClick={handleButtonClick} isDisabled={isButtonDisabled} />
        </div>
    );
};

export default MainComponent;
