// Auto-generated, do not modify
import {ObjectId} from "mongodb";
export interface starboard {
  _id: ObjectId;
  stat_date: string;
  onboarding_at: string;
  sector_size: number;
  balance: number;
  initial_pledge: number;
  locked_funds: number;
  pre_commit_deposits: number;
  provider_collateral: number;
  fee_debt: number;
  base_tx_fee: string;
  over_estimation_burn: string;
  batch_fee: string;
  miner_tip: string;
  windowpost_gas_fee: string;
  blocks_mined: number;
  win_count: number;
  rewards: number;
  provider_id: string;
}
export type starboard_poly = [string, string, string, number, number, number, number, number, number, number, string, string, string, string, string, number, number, number, string];