import React, { useState } from 'react';
import TimerBar from "../TimerBar/TimerBar";
import ClaimButton from '../ClaimButton/ClaimButton';
import {useTelegram} from "../../hooks/useTelegram";

const MainComponent = () => {
    const [status, setStatus] = useState('Loading...');
    const {user} = useTelegram();
    const handleButtonClick = async () => { // Добавляем async
        try {
            const response = await fetch('https://potty-pals.fun/api/claim', {
                headers: {
                    user: user?.id,
                }
            });

            if (response.ok) {
                console.log('Claim successful');
                // Дополнительная логика при успешном выполнении
            } else {
                console.error('Failed to claim');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={'container'}>
            <div className={'status'}>{status}</div>
            <TimerBar setStatus={setStatus} />
            <ClaimButton status={status} onClick={handleButtonClick} />
        </div>
    );
};

export default MainComponent;
