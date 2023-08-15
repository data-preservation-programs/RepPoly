import {Polybase} from "@polybase/client";

export interface Collection {
    repdao: string,
    polybase: CollectionName,
    provider: string,
}

export type CollectionName = 'filfox' | 'filrep' | 'filscan' | 'gravity_assist_retrieval_bot' | 'ground_control_sp_location'
    | 'lassie_bedrock' | 'protocol_labs_retrieval_bot' | 'filecoin_foundation_retrieval_bot' | 'slingshot_retrieval_bot'
    | 'starboard'

export const CollectionNames: CollectionName[] = [
    'filfox',
    'filrep',
    'filscan',
    //'gravity_assist_retrieval_bot',
    'ground_control_sp_location',
    'lassie_bedrock',
    'protocol_labs_retrieval_bot',
    'filecoin_foundation_retrieval_bot',
    'slingshot_retrieval_bot',
    'starboard',
]

export const DefaultNamespace = 'pk/0x38d810a48aed860010ddd510ca9070b383490b3521972cdbd296d373dcd7183c8a885e1a2fd6fb2805216398a0ac5cf11a40ed452c3e4f893ca3ca794da3fbbf'

export const DB = new Polybase({
    defaultNamespace: DefaultNamespace,
    // baseURL: "https://mainnet.polybase.xyz/v0",
})

export const collections: Collection[] = [
    {
        repdao: 'Filfox',
        polybase: 'filfox',
        provider: 'miner',
    },
    {
        repdao: 'filrep',
        polybase: 'filrep',
        provider: 'miner',
    },
    {
        repdao: 'filscan',
        polybase: 'filscan',
        provider: 'actor',
    },
    // /*
    // {
    //     repdao: 'gravity_assist',
    //     polybase: 'gravity_assist_retrieval_bot',
    //     provider: 'provider_id',
    // },
    // */
    {
        repdao: 'kentiks',
        polybase: 'ground_control_sp_location',
        provider: 'provider',
    },
    {
        repdao: 'lassie',
        polybase: 'lassie_bedrock',
        provider: 'sp_id',
    },
    {
        repdao: 'retrievalbot_1',
        polybase: 'protocol_labs_retrieval_bot',
        provider: 'provider_id',
    },
    {
        repdao: 'retrievalbot_2',
        polybase: 'filecoin_foundation_retrieval_bot',
        provider: 'provider_id',
    },
    {
        repdao: 'retrievalbot_3',
        polybase: 'slingshot_retrieval_bot',
        provider: 'provider_id',
    },
    {
        repdao: 'starboard',
        polybase: 'starboard',
        provider: 'provider_id',
    },
]
