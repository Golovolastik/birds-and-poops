import React, {useState} from 'react';
import './TaskButton.css';

const TaskButton = ({link}) => {

    const [status, setStatus] = useState('initial'); // 'initial', 'check', 'disabled'

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
            fetch('https://your-backend-endpoint.com/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ someData: 'yourData' }),
            })
                .then(response => {
                    if (response.ok) {
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