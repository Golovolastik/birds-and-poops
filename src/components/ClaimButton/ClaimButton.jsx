import React from 'react';
import './ClaimButton.css';

const ClaimButton = ({ status, onClick }) => (
    <button
        onClick={onClick}
        disabled={status === 'Running' || status === 'Loading...'}
        className={'claim-button'}
    >
        Claim
    </button>
);

export default ClaimButton;
