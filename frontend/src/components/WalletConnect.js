import React from 'react';

const WalletConnect = ({ onConnect, loading }) => {
    return (
        <div className="card">
            <div className="wallet-connect">
                <h2>Connect Your Wallet</h2>
                <p>
                    Connect your Freighter wallet to interact with your Stellar Piggy Bank contract. 
                    Your funds are secured by blockchain smart contract technology.
                </p>
                
                <button
                    className="btn btn-primary"
                    onClick={onConnect}
                    disabled={loading}
                >
                    {loading ? 'Connecting...' : 'Connect Freighter Wallet'}
                </button>
                
                <div style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Don't have Freighter?{' '}
                    <a 
                        href="https://freighter.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="wallet-link"
                    >
                        Install here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WalletConnect;