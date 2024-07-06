import React from 'react';
import './ClaimButton.css'

const ClaimButton = (props) => {
    return (
        <button {...props} className={'claim-button'}>
            Claim
        </button>
    );
};

export default ClaimButton;