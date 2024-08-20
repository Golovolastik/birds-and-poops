import React, { useState, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Tasks.css';
import TaskButton from '../TaskButton/TaskButton';

const Tasks = () => {
    const { user } = useTelegram();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetch('https://potty-pals.fun/api/task/get-tasks', {
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
        <div className={"container"}>
            <h2>Active tasks</h2>
            <div className="tasks-list">
                {tasks.map(task => (
                    <div key={task.task_id} className="task-item">
                        <img src={task.icon_link} alt={task.name} className="task-icon"/>
                        <div className="task-details">
                            <h3>{task.name}</h3>
                            <p>Reward: {task.reward} points</p>
                            <TaskButton link={`https://${task.channel_link}`}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Tasks;
