import React from 'react';
import './ClaimButton.css';

const ClaimButton = ({ onClick, isDisabled }) => (
    <button
        onClick={onClick}
        className={`claim-button ${isDisabled ? 'disabled' : ''}`}
        disabled={isDisabled}
    >
        {isDisabled ? 'Please wait' : 'Claim Now'}
    </button>
);

export default ClaimButton;
