import React from 'react';
import stellarService from '../services/stellarService';

const UserInfo = ({ userAddress, onRefresh, loading }) => {
    return (
        <div className="card">
            <div className="user-info">
                <div className="user-details">
                    <h4>Connected Wallet:</h4>
                    <div className="user-address">
                        {stellarService.formatAddress(userAddress)}
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={onRefresh}
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
        </div>
    );
};

export default UserInfo;