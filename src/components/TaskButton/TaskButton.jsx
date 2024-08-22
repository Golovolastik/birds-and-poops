import React, {useState} from 'react';
import './TaskButton.css';
import {useTelegram} from "../../hooks/useTelegram";

const TaskButton = ({link, channelName}) => {

    const [status, setStatus] = useState('initial'); // 'initial', 'check', 'disabled'
    const user = useTelegram();
    const handleClick = () => {
        if (status === 'initial') {
            // Используем Telegram.WebApp.openLink для перехода по ссылке без подтверждения
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.openTelegramLink(link);
            } else {
                // Альтернативное поведение, если Telegram WebApp API недоступно
                window.location.href = link;
            }
            setStatus('check');
        } else if (status === 'check') {
            // Отправка данных на бэкэнд
            fetch(`https://potty-pals.fun/api/task/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: `${user?.id}`,
                    channel_username: `${channelName}`
                }),
            })
                .then(response => {
                    if (response.body.result === true) {
                        setStatus('disabled'); // Успешный ответ, кнопка становится неактивной
                    } else {
                        setStatus('initial'); // Ошибка, возвращаемся в первоначальное состояние
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setStatus('initial'); // Возвращаемся в первоначальное состояние в случае ошибки
                });
        }
    };

    return (
        <button
            className={'task-btn'}
            onClick={handleClick}
            disabled={status === 'disabled'}
            style={{ cursor: status === 'disabled' ? 'not-allowed' : 'pointer' }}
        >
            {status === 'initial' ? 'Go to Link' : status === 'check' ? 'Check' : 'Disabled'}
        </button>
    );
};

export default TaskButton;