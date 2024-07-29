import React from 'react';
import './Points.css';

const Points = (points) => {
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
