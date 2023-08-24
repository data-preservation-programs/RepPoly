/*
  Files initially sorted by field name for both .ts .polylang files. Going 
  forward adding new fields should be added at the end of the collection
  to help prevent columns ending up with wrong values.
*/

export interface Field {
  name: string
  type: string
}

export const argFields: { [key: string]: Field[] } = {
  'Filfox': [
    { name: '_id', type: 'string' },
    { name: 'blocksMined', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'epoch', type: 'number' },
    { name: 'provider', type: 'string' },
    { name: 'qualityAdjPower', type: 'string' },
    { name: 'rawBytePower', type: 'string' },
    { name: 'totalRewards', type: 'string' },
    { name: 'weightedBlocksMined', type: 'number' },
  ],
  'filrep': [
    { name: '_id', type: 'string' },
    { name: '__v', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'price', type: 'string' },
    { name: 'provider', type: 'string' },
    { name: 'rank', type: 'number' },
    { name: 'reachability', type: 'string' },
    { name: 'recentDeals', type: 'number' },
    { name: 'verifiedPrice', type: 'string' },
  ],
  'filscan': [
    { name: '_id', type: 'string' },
    { name: 'active_sector_count', type: 'number' },
    { name: 'balance', type: 'string' },
    { name: 'date_stamp', type: 'string' },
    { name: 'epoch', type: 'number' },
    { name: 'fault_sector_count', type: 'number' },
    { name: 'live_sector_count', type: 'number' },
    { name: 'multi_address', type: 'string' },
    { name: 'provider', type: 'string' },
    { name: 'recover_sector_count', type: 'number' },
    { name: 'terminated_sector_count', type: 'number' },
  ],
  // ground_control_sp_location
  'kentiks': [
    { name: '_id', type: 'string' },
    { name: '__v', type: 'number' },
    { name: 'agentCity', type: 'string' },
    { name: 'agentCountry', type: 'string' },
    { name: 'agentLatitude', type: 'number' },
    { name: 'agentLongitude', type: 'number' },
    { name: 'agentRegion', type: 'string' },
    { name: 'date_stamp', type: 'string' },
    { name: 'latencyMs', type: 'number' },
    { name: 'multiaddr', type: 'string' },
    { name: 'provider', type: 'string' },
    { name: 'testId', type: 'string' },
  ],
  // lassie_bedrock
  'lassie': [
    { name: '_id', type: 'string' },
    { name: 'bandwidth_bytes_sec', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'end_time', type: 'string' },
    { name: 'instance_id', type: 'string' },
    { name: 'provider', type: 'string' },
    { name: 'retrieval_id', type: 'string' },
    { name: 'start_time', type: 'string' },
    { name: 'storage_provider_id', type: 'string' },
    { name: 'success', type: 'boolean' },
    { name: 'time_to_first_byte_ms', type: 'number' },
  ],
  // protocol_labs_retrieval_bot
  'retrievalbot_1': [
    { name: '_id', type: 'string' },
    { name: 'avg_speed_bps', type: 'number' },
    { name: 'avg_ttfb_ms', type: 'number' },
    { name: 'bitswap_retrieval_success', type: 'number' },
    { name: 'bitswap_retrievals', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'graphsync_retrieval_success', type: 'number' },
    { name: 'graphsync_retrievals', type: 'number' },
    { name: 'http_retrieval_success', type: 'number' },
    { name: 'http_retrievals', type: 'number' },
    { name: 'provider', type: 'string' },
  ],
  // filecoin_foundation_retrieval_bot
  'retrievalbot_2': [
    { name: '_id', type: 'string' },
    { name: 'avg_speed_bps', type: 'number' },
    { name: 'avg_ttfb_ms', type: 'number' },
    { name: 'bitswap_retrieval_success', type: 'number' },
    { name: 'bitswap_retrievals', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'graphsync_retrieval_success', type: 'number' },
    { name: 'graphsync_retrievals', type: 'number' },
    { name: 'http_retrieval_success', type: 'number' },
    { name: 'http_retrievals', type: 'number' },
    { name: 'provider', type: 'string' },
  ],
  // slingshot_retrievalbot
  'retrievalbot_3': [
    { name: '_id', type: 'string' },
    { name: 'avg_speed_bps', type: 'number' },
    { name: 'avg_ttfb_ms', type: 'number' },
    { name: 'bitswap_retrieval_success', type: 'number' },
    { name: 'bitswap_retrievals', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'graphsync_retrieval_success', type: 'number' },
    { name: 'graphsync_retrievals', type: 'number' },
    { name: 'http_retrieval_success', type: 'number' },
    { name: 'http_retrievals', type: 'number' },
    { name: 'provider', type: 'string' },
  ],
  // new_web_group_retrieval_bot
  'retrievalbot_4': [
    { name: '_id', type: 'string' },
    { name: 'avg_speed_bps', type: 'number' },
    { name: 'avg_ttfb_ms', type: 'number' },
    { name: 'bitswap_retrieval_success', type: 'number' },
    { name: 'bitswap_retrievals', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'graphsync_retrieval_success', type: 'number' },
    { name: 'graphsync_retrievals', type: 'number' },
    { name: 'http_retrieval_success', type: 'number' },
    { name: 'http_retrievals', type: 'number' },
    { name: 'provider', type: 'string' },
  ],
  // gravity_assist_retrieval_bot
  'retrievalbot_5': [
    { name: '_id', type: 'string' },
    { name: 'avg_speed_bps', type: 'number' },
    { name: 'avg_ttfb_ms', type: 'number' },
    { name: 'bitswap_retrieval_success', type: 'number' },
    { name: 'bitswap_retrievals', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'graphsync_retrieval_success', type: 'number' },
    { name: 'graphsync_retrievals', type: 'number' },
    { name: 'http_retrieval_success', type: 'number' },
    { name: 'http_retrievals', type: 'number' },
    { name: 'provider', type: 'string' },
  ],
  'starboard': [
    { name: '_id', type: 'string' },
    { name: 'balance', type: 'number' },
    { name: 'base_tx_fee', type: 'string' },
    { name: 'batch_fee', type: 'string' },
    { name: 'blocks_mined', type: 'number' },
    { name: 'date_stamp', type: 'string' },
    { name: 'fee_debt', type: 'number' },
    { name: 'initial_pledge', type: 'number' },
    { name: 'locked_funds', type: 'number' },
    { name: 'miner_tip', type: 'string' },
    { name: 'onboarding_at', type: 'string' },
    { name: 'over_estimation_burn', type: 'string' },
    { name: 'pre_commit_deposits', type: 'number' },
    { name: 'provider_collateral', type: 'number' },
    { name: 'provider', type: 'string' },
    { name: 'rewards', type: 'number' },
    { name: 'sector_size', type: 'number' },
    { name: 'stat_date', type: 'string' },
    { name: 'win_count', type: 'number' },
    { name: 'windowpost_gas_fee', type: 'string' },
  ],
  'stfil': [
    { name: '_id', type: 'string' },
    { name: 'date_stamp', type: 'string' },
    { name: 'debt_ratio', type: 'string' },
    { name: 'debt', type: 'string' },
    { name: 'delegated_role', type: 'string' },
    { name: 'equity', type: 'string' },
    { name: 'liquidation_threshold', type: 'number' },
    { name: 'max_leverage', type: 'number' },
    { name: 'position', type: 'string' },
    { name: 'provider', type: 'string' },
    { name: 'stable_debt', type: 'string' },
    { name: 'variable_debt', type: 'string' },
  ],
}