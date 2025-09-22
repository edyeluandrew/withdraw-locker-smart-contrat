import React, { useState, useEffect } from 'react';
import './index.css';

// Components
import Header from './components/Header';
import WalletConnect from './components/WalletConnect';
import Alert from './components/Alert';
import UserInfo from './components/UserInfo';
import BalanceCard from './components/BalanceCard';
import DepositCard from './components/DepositCard';
import WithdrawCard from './components/WithdrawCard';
import ContractDetails from './components/ContractDetails';

// Services
import stellarService from './services/stellarService';

const App = () => {
    // State management
    const [userAddress, setUserAddress] = useState('');
    const [balance, setBalance] = useState('0');
    const [contractInfo, setContractInfo] = useState(null);
    const [canWithdraw, setCanWithdraw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    // Clear messages
    const clearMessages = () => {
        setStatus('');
        setError('');
    };

    // Connect wallet
    const connectWallet = async () => {
        try {
            setLoading(true);
            clearMessages();
            
            const address = await stellarService.connectWallet();
            setUserAddress(address);
            setIsConnected(true);
            setStatus('Wallet connected successfully!');
            
            await refreshData();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Refresh all contract data
    const refreshData = async () => {
        if (!isConnected) return;
        
        try {
            setLoading(true);
            clearMessages();

            const [balance, contractInfo, canWithdraw] = await Promise.all([
                stellarService.getBalance(),
                stellarService.getContractInfo(),
                stellarService.canWithdraw()
            ]);

            setBalance(balance?.toString() || '0');
            setContractInfo(contractInfo);
            setCanWithdraw(canWithdraw);
        } catch (error) {
            console.error('Refresh error:', error);
            setError('Failed to refresh data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle deposit
    const handleDeposit = async (amount) => {
        if (!amount || !userAddress) {
            setError('Please enter a valid deposit amount');
            return;
        }

        try {
            setLoading(true);
            clearMessages();
            
            await stellarService.deposit(userAddress, amount);
            setStatus(`Deposit of ${amount} units submitted! Waiting for confirmation...`);
            
            // Refresh after delay
            setTimeout(refreshData, 3000);
        } catch (error) {
            setError('Deposit failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle withdrawal
    const handleWithdraw = async (amount) => {
        if (!amount || !userAddress) {
            setError('Please enter a valid withdrawal amount');
            return;
        }

        if (parseInt(amount) > parseInt(balance)) {
            setError('Insufficient balance');
            return;
        }

        try {
            setLoading(true);
            clearMessages();
            
            await stellarService.withdraw(userAddress, amount);
            setStatus(`Withdrawal of ${amount} units submitted! Waiting for confirmation...`);
            
            // Refresh after delay
            setTimeout(refreshData, 3000);
        } catch (error) {
            setError('Withdrawal failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Auto-refresh every 15 seconds
    useEffect(() => {
        if (isConnected) {
            const interval = setInterval(refreshData, 15000);
            return () => clearInterval(interval);
        }
    }, [isConnected]);

    return (
        <div className="app">
            <div className="container">
                <Header />
                
                {!isConnected ? (
                    <WalletConnect onConnect={connectWallet} loading={loading} />
                ) : (
                    <>
                        {/* Status Messages */}
                        {status && (
                            <Alert 
                                type="success" 
                                message={status} 
                                onClose={clearMessages}
                            />
                        )}

                        {error && (
                            <Alert 
                                type="error" 
                                message={error} 
                                onClose={clearMessages}
                            />
                        )}

                        {/* User Info */}
                        <UserInfo 
                            userAddress={userAddress}
                            onRefresh={refreshData}
                            loading={loading}
                        />

                        {/* Main Dashboard */}
                        <div className="grid grid-2">
                            {/* Balance Card */}
                            <BalanceCard 
                                balance={balance}
                                contractInfo={contractInfo}
                                canWithdraw={canWithdraw}
                                loading={loading}
                                onRefresh={refreshData}
                            />

                            {/* Actions Column */}
                            <div>
                                {/* Deposit Card */}
                                <DepositCard 
                                    onDeposit={handleDeposit}
                                    loading={loading}
                                />

                                {/* Withdraw Card */}
                                <div style={{ marginTop: '30px' }}>
                                    <WithdrawCard 
                                        onWithdraw={handleWithdraw}
                                        loading={loading}
                                        canWithdraw={canWithdraw}
                                        balance={balance}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contract Details */}
                        <ContractDetails />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;