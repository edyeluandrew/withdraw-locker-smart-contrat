import * as StellarSdk from '@stellar/stellar-sdk';

// Stellar Configuration
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
const CONTRACT_ID = 'CCTHNSMHCQQXQJX4P2RXJ3O6SURIMFAIY3WJYDGPL6OJ3ZM22FGUP4LZ';

class StellarService {
    constructor() {
        this.contractId = CONTRACT_ID;
        this.networkPassphrase = NETWORK_PASSPHRASE;
        this.connectedAddress = null;
    }

    // Check if Freighter is available
    isFreighterAvailable() {
        const available = !!(window.freighterApi);
        console.log('Freighter availability check:', available);
        return available;
    }

    // Wait for Freighter to load
    async waitForFreighter(timeout = 5000) {
        const startTime = Date.now();
        
        while (!window.freighterApi && (Date.now() - startTime) < timeout) {
            console.log('Waiting for Freighter to load...');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return !!window.freighterApi;
    }

    async connectWallet() {
        console.log('=== Starting wallet connection ===');
        
        try {
            // Wait for Freighter to load if not immediately available
            const freighterLoaded = await this.waitForFreighter();
            
            if (!freighterLoaded) {
                console.error('Freighter not found after waiting');
                throw new Error('Freighter wallet extension not found. Please install Freighter and refresh the page.');
            }

            console.log('Freighter detected, available methods:', Object.keys(window.freighterApi));
            
            // Check if Freighter is locked
            console.log('Checking Freighter status...');
            
            // Request access
            console.log('Requesting wallet access...');
            const accessResult = await window.freighterApi.requestAccess();
            console.log('Access request result:', accessResult);
            
            // Get address
            console.log('Getting wallet address...');
            const addressResult = await window.freighterApi.getAddress();
            console.log('Address result:', addressResult);
            
            if (!addressResult || !addressResult.address) {
                throw new Error('Failed to get wallet address');
            }
            
            this.connectedAddress = addressResult.address;
            console.log('Successfully connected to:', this.connectedAddress);
            
            return this.connectedAddress;
            
        } catch (error) {
            console.error('=== Connection failed ===');
            console.error('Error type:', error.constructor.name);
            console.error('Error message:', error.message);
            console.error('Full error:', error);
            
            // Provide more specific error messages
            let friendlyMessage = 'Connection failed: ' + error.message;
            
            if (error.message.includes('User declined access')) {
                friendlyMessage = 'Connection cancelled. Please accept the connection request in Freighter.';
            } else if (error.message.includes('not found')) {
                friendlyMessage = 'Freighter wallet not found. Please install the Freighter extension and refresh the page.';
            } else if (error.message.includes('locked')) {
                friendlyMessage = 'Please unlock your Freighter wallet and try again.';
            }
            
            throw new Error(friendlyMessage);
        }
    }

    // Get current connected address
    getConnectedAddress() {
        return this.connectedAddress;
    }

    // Check connection status
    isConnected() {
        return !!this.connectedAddress;
    }

    // Disconnect wallet
    disconnect() {
        this.connectedAddress = null;
        console.log('Wallet disconnected');
    }

    formatAddress(address) {
        if (!address) return '';
        return address.slice(0, 8) + '...' + address.slice(-8);
    }

    // Placeholder methods for your other functions
    async getBalance() {
        console.log('Getting balance...');
        // TODO: Implement balance retrieval
        return '0';
    }

    async getContractInfo() {
        console.log('Getting contract info...');
        // TODO: Implement contract info retrieval
        return null;
    }

    async canWithdraw() {
        console.log('Checking withdraw status...');
        // TODO: Implement withdraw check
        return false;
    }

    async deposit(userAddress, amount) {
        console.log('Depositing:', amount);
        // TODO: Implement deposit
        throw new Error('Deposit not implemented yet');
    }

    async withdraw(userAddress, amount) {
        console.log('Withdrawing:', amount);
        // TODO: Implement withdraw
        throw new Error('Withdraw not implemented yet');
    }
}

const stellarService = new StellarService();
export default stellarService;