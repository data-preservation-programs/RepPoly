// Auto-generated, do not modify
import {ObjectId} from "mongodb";
export interface kentik {
  _id: ObjectId;
  date: Date;
  multiaddr: string;
  provider: string;
  testId: string;
  __v: number;
  agentCity: string;
  agentCountry: string;
  agentLatitude: number;
  agentLongitude: number;
  agentRegion: string;
  latencyMs: number;
}
export type kentik_poly = [string, string, string, string, string, number, string, string, number, number, string, number];