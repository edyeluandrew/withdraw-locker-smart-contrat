import React, { useState } from 'react';

const WithdrawCard = ({ onWithdraw, loading, canWithdraw, balance }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && parseFloat(amount) > 0 && canWithdraw) {
            onWithdraw(amount);
            setAmount('');
        }
    };

    const isValidAmount = amount && parseFloat(amount) > 0 && parseFloat(amount) <= parseFloat(balance);

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-icon">💸</span>
                <h3>Withdraw</h3>
                {!canWithdraw && (
                    <span style={{ color: '#ffd43b', fontSize: '20px' }} title="Time-locked">🔒</span>
                )}
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount to withdraw"
                        className="form-input"
                        disabled={!canWithdraw}
                        min="1"
                        max={balance}
                        step="1"
                    />
                </div>
                
                <button
                    type="submit"
                    className={`btn btn-full ${canWithdraw ? 'btn-danger' : 'btn'}`}
                    disabled={loading || !canWithdraw || !isValidAmount}
                    style={!canWithdraw ? {
                        background: '#666',
                        color: '#999',
                        cursor: 'not-allowed'
                    } : {}}
                >
                    {loading ? 'Processing...' : 
                     canWithdraw ? 'Withdraw' : 
                     'Locked Until Unlock Time'}
                </button>
            </form>
            
            {!canWithdraw && (
                <div style={{ 
                    marginTop: '15px', 
                    fontSize: '14px', 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    textAlign: 'center' 
                }}>
                    Withdrawals are time-locked for security
                </div>
            )}
        </div>
    );
};

export default WithdrawCard;