import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import stellarService from '../services/stellarService';

const BalanceCard = ({ balance, contractInfo, canWithdraw, loading, onRefresh }) => {
    if (loading) {
        return (
            <div className="card">
                <LoadingSpinner message="Loading balance..." />
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-icon">💰</span>
                <h2>Balance & Status</h2>
            </div>

            <div className="balance-display">
                <div className="balance-amount">{balance}</div>
                <div className="balance-unit">Testnet Units</div>
            </div>

            {contractInfo && (
                <div className="status-info">
                    <div className="status-row">
                        <span className="status-label">Owner</span>
                        <span className="status-value status-address">
                            {stellarService.formatAddress(contractInfo.owner)}
                        </span>
                    </div>
                    
                    <div className="status-row">
                        <span className="status-label">Unlock Time</span>
                        <span className="status-value">
                            {stellarService.formatTimestamp(contractInfo.unlock_timestamp)}
                        </span>
                    </div>
                    
                    <div className="status-row">
                        <span className="status-label">Status</span>
                        <div className="status-indicator">
                            <div className={`status-dot ${canWithdraw ? 'green' : 'yellow'}`}></div>
                            <span className="status-value">
                                {canWithdraw ? 'Unlocked' : 'Locked'}
                            </span>
                        </div>
                    </div>
                    
                    {!canWithdraw && (
                        <div className="time-remaining">
                            <span>⏰</span>
                            <span>{stellarService.getTimeRemaining(contractInfo.unlock_timestamp)}</span>
                        </div>
                    )}
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                <button
                    className="btn btn-primary btn-full"
                    onClick={onRefresh}
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
        </div>
    );
};

export default BalanceCard;