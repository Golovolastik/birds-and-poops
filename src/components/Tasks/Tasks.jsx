import React, { useState, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

const Tasks = () => {
    const { user } = useTelegram();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetch('https://potty-pals.fun/api/get-tasks', {
                    headers: {
                        user: user?.id,
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        setTasks(data.tasks); // Сохраняем задачи в состояние
                    } else {
                        console.error('Failed to fetch tasks');
                    }
                } else {
                    console.error('Failed to fetch');
                }

            } catch (e) {
                console.error('Error fetching tasks:', e);
            }
        };

        getTasks(); // Загружаем задания при монтировании компонента
    }, [user]);

    return (
        <div>
            <h2>Tasks Page</h2>
            <div className="tasks-list">
                {tasks.map(task => (
                    <div key={task.task_id} className="task-item">
                        <img src={task.icon_link} alt={task.name} className="task-icon" />
                        <div className="task-details">
                            <h3>{task.name}</h3>
                            <p>Username: {task.channel_username}</p>
                            <p>Reward: {task.reward} points</p>
                            <a href={`https://${task.channel_link}`} target="_blank" rel="noopener noreferrer">Go to Channel</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
