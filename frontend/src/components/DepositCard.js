import React, { useState } from 'react';

const DepositCard = ({ onDeposit, loading }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && parseFloat(amount) > 0) {
            onDeposit(amount);
            setAmount('');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-icon">💳</span>
                <h3>Deposit</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount to deposit"
                        className="form-input"
                        min="1"
                        step="1"
                    />
                </div>
                
                <button
                    type="submit"
                    className="btn btn-success btn-full"
                    disabled={loading || !amount || parseFloat(amount) <= 0}
                >
                    {loading ? 'Processing...' : 'Deposit'}
                </button>
            </form>
        </div>
    );
};

export default DepositCard;