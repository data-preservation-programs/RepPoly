// Auto-generated, do not modify
import {ObjectId} from "mongodb";
export interface lassie {
  _id: ObjectId;
  retrieval_id: string;
  instance_id: string;
  storage_provider_id: string;
  time_to_first_byte_ms: number;
  bandwidth_bytes_sec: number;
  success: boolean;
  start_time: Date;
  end_time: Date;
}
export type lassie_poly = [string, string, string, string, number, number, boolean, string, string];