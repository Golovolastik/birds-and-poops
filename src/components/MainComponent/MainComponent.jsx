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
                const data = await response.json();
                setPoints(data.points); // Обновляем очки
                setLastClaim(data.date); // Обновляем время последнего запроса, если необходимо
                setIsButtonDisabled(true); // Деактивируем кнопку
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
                setPoints( data.points);
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
    console.log('Points:', points);
    console.log('LastClaim:', lastClaim);
    return (
        <div className={'container'}>
            <Points points={points}/>
            <span className={'userId'}>
                Hi! {user?.username}
            </span>
            <TimerBar onTimerEnd={handleTimerEnd} lastClaim={lastClaim}/>
            <ClaimButton onClick={handleButtonClick} isDisabled={isButtonDisabled} />
        </div>
    );
};

export default MainComponent;
