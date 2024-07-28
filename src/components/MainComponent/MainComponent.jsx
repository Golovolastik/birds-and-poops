import React, {useState} from 'react';
import TimerBar from "../TimerBar/TimerBar";
import ClaimButton from '../ClaimButton/ClaimButton';
import {useTelegram} from "../../hooks/useTelegram";
import './MainComponent.css'; // Подключаем стили


const MainComponent = () => {
    const {user} = useTelegram();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [timerKey, setTimerKey] = useState(0);
    const handleButtonClick = async () => { // Добавляем async
        try {
            const response = await fetch('https://potty-pals.fun/api/claim', {
                headers: {
                    user: user?.id,
                }
            });

            if (response.ok) {
                console.log('Claim successful');
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

    const handleTimerEnd = () => {
        setIsButtonDisabled(false);
    };

    return (
        <div className={'container'}>
            <TimerBar key={timerKey} onTimerEnd={handleTimerEnd}/>
            <ClaimButton onClick={handleButtonClick} isDisabled={isButtonDisabled} />
        </div>
    );
};

export default MainComponent;
