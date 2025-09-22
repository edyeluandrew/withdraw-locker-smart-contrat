use soroban_sdk::Env;
use crate::{DataKey, PiggyBankState};

pub fn get_state(env: &Env) -> PiggyBankState {
    match env.storage().instance().get(&DataKey::State) {
        Some(state) => state,
        None => panic!("Contract not initialized"),
    }
}

pub fn set_state(env: &Env, state: &PiggyBankState) {
    env.storage().instance().set(&DataKey::State, state);
}