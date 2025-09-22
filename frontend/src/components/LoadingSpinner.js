import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p style={{ color: 'white', marginTop: '15px' }}>{message}</p>
        </div>
    );
};

export default LoadingSpinner;