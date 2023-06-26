// Auto-generated, do not modify
import {ObjectId} from "mongodb";
export interface retrievalbot {
  _id: ObjectId;
  provider_id: string;
  date: string;
  http_retrievals: number;
  http_retrieval_success: number;
  graphsync_retrievals: number;
  graphsync_retrieval_success: number;
  bitswap_retrievals: number;
  bitswap_retrieval_success: number;
  avg_ttfb_ms: number;
  avg_speed_bps: number;
}
export type retrievalbot_poly = [string, string, string, number, number, number, number, number, number, number, number];