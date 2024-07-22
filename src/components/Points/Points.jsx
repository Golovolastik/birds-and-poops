import React, { useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Points.css';

const Points = () => {
    const { user } = useTelegram();
    const [points, setPoints] = useState(null);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await fetch(`https://potty-pals.fun/api/points`, {
                    headers: {
                        user: user?.id,
                    }
                });
                const data = await response.json();
                setPoints(data.points);
            } catch (error) {
                console.error('Error fetching points:', error);
            }
        };

        if (user?.id) {
            fetchPoints();
        }
    }, [user]);

    return (
        <div className="points">
            {points !== null ? (
                <span>Your points: {points}</span>
            ) : (
                <span>Loading points...</span>
            )}
        </div>
    );
};

export default Points;
