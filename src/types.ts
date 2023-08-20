import {Polybase} from "@polybase/client";

export interface Collection {
    repdao: string,
    polybase: CollectionName,
    provider: string,
}

 export type CollectionName = 'filfox' | 'filrep' | 'filscan' | 'gravity_assist_retrieval_bot' | 'ground_control_sp_location'
     | 'lassie_bedrock' | 'protocol_labs_retrieval_bot' | 'filecoin_foundation_retrieval_bot' | 'slingshot_retrieval_bot'
     | 'starboard' | 'stfil'

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
    'stfil',
]

export const DefaultNamespace = 'pk/0xf3e3d702ef1055c74e071ce744fe6449d4ddfaeaee922b7f8bf50311be251b76bad2c4f09bb4843705468a5361b742d3f1bbc56e436f92c83d888810f93712f4'

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
    /*
    {
        repdao: 'gravity_assist',
        polybase: 'gravity_assist_retrieval_bot',
        provider: 'provider_id',
    },
    */
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
    {
        repdao: 'stfil',
        polybase: 'stfil',
        provider: 'miner',
    },
]
