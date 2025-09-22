#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::{Address as _, Ledger}, Address, Env};

#[test]
fn test_piggy_bank_flow() {
    let env = Env::default();
    let contract_id = env.register_contract(None, PiggyBankContract);
    let client = PiggyBankContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let depositor = Address::generate(&env);
    
    // Set unlock timestamp to 1 hour from now
    let unlock_time = env.ledger().timestamp() + 3600;
    
    // Initialize piggy bank
    client.init(&owner, &unlock_time);
    
    // Test deposit
    let deposit_amount = 1000i128;
    let balance = client.deposit(&depositor, &deposit_amount);
    assert_eq!(balance, deposit_amount);
    
    // Test balance check
    assert_eq!(client.balance(), deposit_amount);
    
    // Test withdrawal before unlock time (should fail)
    let result = std::panic::catch_unwind(|| {
        client.withdraw(&100i128);
    });
    assert!(result.is_err());
    
    assert!(!client.can_withdraw());
    
    env.ledger().set_timestamp(unlock_time + 1);
    
    assert!(client.can_withdraw());
    
    let withdraw_amount = 500i128;
    let remaining_balance = client.withdraw(&withdraw_amount);
    assert_eq!(remaining_balance, deposit_amount - withdraw_amount);
    
    
    assert_eq!(client.balance(), deposit_amount - withdraw_amount);
}

#[test]
fn test_get_info() {
    let env = Env::default();
    let contract_id = env.register_contract(None, PiggyBankContract);
    let client = PiggyBankContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let unlock_time = env.ledger().timestamp() + 3600;
    
    client.init(&owner, &unlock_time);
    
    let info = client.get_info();
    assert_eq!(info.owner, owner);
    assert_eq!(info.unlock_timestamp, unlock_time);
    assert_eq!(info.balance, 0);
}