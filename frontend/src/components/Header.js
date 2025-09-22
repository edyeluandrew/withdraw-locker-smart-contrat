import React from 'react';
import stellarService from '../services/stellarService';

const Header = () => {
    return (
        <div className="header">
            <div className="header-title">
                <div className="logo">🐷</div>
                <h1>Stellar Piggy Bank</h1>
            </div>
            <p className="header-subtitle">Time-locked savings on Stellar blockchain</p>
            <div className="contract-id">
                Contract: {stellarService.formatAddress('CCTHNSMHCQQXQJX4P2RXJ3O6SURIMFAIY3WJYDGPL6OJ3ZM22FGUP4LZ')}
            </div>
        </div>
    );
};

export default Header;