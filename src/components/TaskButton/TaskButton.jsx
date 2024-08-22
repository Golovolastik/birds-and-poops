import React, {useState} from 'react';
import './TaskButton.css';
import {useTelegram} from "../../hooks/useTelegram";

const TaskButton = ({link, channelName}) => {
    const [status, setStatus] = useState('initial'); // 'initial', 'check', 'disabled'
    const [showPopup, setShowPopup] = useState(false);
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
                .then(response => response.json())
                .then(data => {
                    if (data.result === true) {
                        setStatus('disabled'); // Успешный ответ, кнопка становится неактивной
                        setShowPopup(true); // Показать всплывающее окно

                        // Скрыть всплывающее окно через 2 секунды
                        setTimeout(() => {
                            setShowPopup(false);
                        }, 2000);
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
        <div className={'task-btn'}>
            <button
                className={'task-btn'}
                onClick={handleClick}
                disabled={status === 'disabled'}
                style={{cursor: status === 'disabled' ? 'not-allowed' : 'pointer'}}
            >
                {status === 'initial' ? 'Go to Link' : status === 'check' ? 'Check' : 'Disabled'}
            </button>
            {showPopup && (
                <div style={popupStyles}>
                    Complete
                </div>
            )}
        </div>

    );
};
const popupStyles = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
};
export default TaskButton;