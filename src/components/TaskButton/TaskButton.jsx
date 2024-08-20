import React, {useState} from 'react';
import './TaskButton.css';

const TaskButton = ({link}) => {
    const [status, setStatus] = useState('initial'); // 'initial', 'check', 'disabled'

    const handleCheckClick = () => {
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
    };

    return (
        <>
            {status === 'initial' ? (
                <a href={`https://${link}`} onClick={() => setStatus('check')} className="button">
                    Go to Link
                </a>
            ) : (
                <button onClick={handleCheckClick} disabled={status === 'disabled'}>
                    {status === 'check' ? 'Check' : 'Disabled'}
                </button>
            )}
        </>
    );
};

export default TaskButton;