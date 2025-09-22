#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, log};

pub mod storage;
pub use storage::*;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PiggyBankState {
    pub owner: Address,
    pub unlock_timestamp: u64,
    pub balance: i128,
}

#[contracttype]
pub enum DataKey {
    State,
}

#[contract]
pub struct PiggyBankContract;

#[contractimpl]
impl PiggyBankContract {
    /// Initialize the piggy bank with owner and unlock timestamp
    pub fn init(env: Env, owner: Address, unlock_timestamp: u64) {
        let state = PiggyBankState {
            owner: owner.clone(),
            unlock_timestamp,
            balance: 0,
        };
        
        storage::set_state(&env, &state);
        log!(&env, "PiggyBank initialized for owner: {}", owner);
    }

    /// Deposit funds to the piggy bank
    pub fn deposit(env: Env, from: Address, amount: i128) -> i128 {
        from.require_auth();
        
        if amount <= 0 {
            panic!("Deposit amount must be positive");
        }

        let mut state = storage::get_state(&env);
        
        // For testnet XLM deposits, we'll track the balance
        state.balance += amount;
        storage::set_state(&env, &state);
        
        log!(&env, "Deposited {} from {}", amount, from);
        state.balance
    }

    /// Check current balance
    pub fn balance(env: Env) -> i128 {
        let state = storage::get_state(&env);
        state.balance
    }

    /// Withdraw funds (only owner, only after unlock time)
    pub fn withdraw(env: Env, amount: i128) -> i128 {
        let mut state = storage::get_state(&env);
        
        // Only owner can withdraw
        state.owner.require_auth();
        
        // Check if unlock time has passed 
        let current_time = env.ledger().timestamp();
        if current_time < state.unlock_timestamp {
            panic!("Cannot withdraw before unlock timestamp");
        }
        
        if amount <= 0 {
            panic!("Withdraw amount must be positive");
        }
        
        if amount > state.balance {
            panic!("Insufficient balance");
        }

        // For testnet, we'll just update the balance
        state.balance -= amount;
        storage::set_state(&env, &state);
        
        log!(&env, "Withdrawn {} to owner", amount);
        state.balance
    }

    /// Get piggy bank info
    pub fn get_info(env: Env) -> PiggyBankState {
        storage::get_state(&env)
    }

    /// Check if withdrawal is allowed
    pub fn can_withdraw(env: Env) -> bool {
        let state = storage::get_state(&env);
        let current_time = env.ledger().timestamp();
        current_time >= state.unlock_timestamp
    }
}