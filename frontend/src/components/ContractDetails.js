import React from 'react';

const ContractDetails = () => {
    const CONTRACT_ID = 'CCTHNSMHCQQXQJX4P2RXJ3O6SURIMFAIY3WJYDGPL6OJ3ZM22FGUP4LZ';
    
    return (
        <div className="card contract-details">
            <h3>Contract Information</h3>
            <div className="details-grid">
                <div className="detail-item">
                    <h4>Contract ID:</h4>
                    <div className="detail-value">{CONTRACT_ID}</div>
                </div>
                <div className="detail-item">
                    <h4>Network:</h4>
                    <div className="detail-value">Stellar Testnet</div>
                </div>
                <div className="detail-item">
                    <h4>Features:</h4>
                    <div className="detail-value">Time-locked withdrawals, Owner-only access, Public deposits</div>
                </div>
                <div className="detail-item">
                    <h4>Security:</h4>
                    <div className="detail-value">Smart contract enforced, Blockchain verified</div>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;