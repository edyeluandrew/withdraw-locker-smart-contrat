import React from 'react';

const Alert = ({ type, message, onClose }) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '⚠';
            default:
                return 'ℹ';
        }
    };

    return (
        <div className={`alert alert-${type}`}>
            <span>{getIcon()}</span>
            <span>{message}</span>
            {onClose && (
                <button 
                    onClick={onClose}
                    style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        fontSize: '18px'
                    }}
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Alert;