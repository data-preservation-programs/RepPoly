import {Polybase} from "@polybase/client";

export interface Collection {
    repdao: string,
    polybase: CollectionName,
    provider: string,
    dateFunc: (doc: any) => string | undefined
}

export type CollectionName = 'filfox' | 'filrep' | 'filscan' 
    | 'ground_control_sp_location'| 'lassie_bedrock' | 'protocol_labs_retrieval_bot' 
    | 'filecoin_foundation_retrieval_bot' | 'slingshot_retrieval_bot'| 'starboard' | 'stfil' 
    | 'new_web_group_retrieval_bot' | 'glif_retrieval_bot' | 'gravity_assist_retrieval_bot' | 'cid_checker_bot_geo' 
    | 'triton_retrieval_bot'

export const CollectionNames: CollectionName[] = [
    'cid_checker_bot_geo',
    'filecoin_foundation_retrieval_bot',
    'filfox',
    'filrep',
    'filscan',
    'glif_retrieval_bot',
    'gravity_assist_retrieval_bot',
    'ground_control_sp_location',
    'lassie_bedrock',
    'new_web_group_retrieval_bot',
    'protocol_labs_retrieval_bot',
    'slingshot_retrieval_bot',
    'starboard',
    'stfil',
    'triton_retrieval_bot',
]

export const DefaultNamespace = 'pk/0xf3e3d702ef1055c74e071ce744fe6449d4ddfaeaee922b7f8bf50311be251b76bad2c4f09bb4843705468a5361b742d3f1bbc56e436f92c83d888810f93712f4'

export const DB = new Polybase({
    defaultNamespace: DefaultNamespace,
    baseURL: "https://mainnet.polybase.xyz/v0",
})

export const collections: Collection[] = [
    {
        repdao: 'cid_checker_bot_geo',
        polybase: 'cid_checker_bot_geo',
        provider: 'miner_id',
        dateFunc: (doc) => doc['created_at']?.toISOString().substring(0, 10)
    },
    {
        repdao: 'Filfox',
        polybase: 'filfox',
        provider: 'miner',
        dateFunc: (doc) => epochToDate(doc['epoch'])
        
    },
    {
        repdao: 'filrep',
        polybase: 'filrep',
        provider: 'miner',
        dateFunc: (doc) => doc['date']?.toISOString().substring(0, 10),
    },
    {
        repdao: 'filscan',
        polybase: 'filscan',
        provider: 'actor',
        dateFunc: (doc) => epochToDate(doc['epoch'])
    },
    {
        repdao: 'kentiks',
        polybase: 'ground_control_sp_location',
        provider: 'provider',
        dateFunc: (doc) => doc['date']?.toISOString().substring(0, 10),
    },
    {
        repdao: 'lassie',
        polybase: 'lassie_bedrock',
        provider: 'sp_id',
        dateFunc: (doc) => doc['start_time']?.toISOString().substring(0, 10),
    },
    {
        repdao: 'retrievalbot_1',
        polybase: 'protocol_labs_retrieval_bot',
        provider: 'provider_id',
        dateFunc: (doc) => doc['date'],
    },
    {
        repdao: 'retrievalbot_2',
        polybase: 'filecoin_foundation_retrieval_bot',
        provider: 'provider_id',
        dateFunc: (doc) => doc['date'],
    },
    {
        repdao: 'retrievalbot_3',
        polybase: 'slingshot_retrieval_bot',
        provider: 'provider_id',
        dateFunc: (doc) => doc['date'],
    },
    {
        repdao: 'retrievalbot_4',
        polybase: 'new_web_group_retrieval_bot',
        provider: 'provider_id',
        dateFunc: (doc) => doc['date'],
    },
    {
        repdao: 'retrievalbot_5',
        polybase: 'gravity_assist_retrieval_bot',
        provider: 'provider_id',
        dateFunc: (doc) => doc['date'],
    },
    {
        repdao: 'glif_retrieval_bot',
        polybase: 'glif_retrieval_bot',
        provider: 'provider_id',
        dateFunc: (doc) => doc['date'],
    },
    {
        repdao: 'retrievalbot_6',
        polybase: 'triton_retrieval_bot',
        provider: 'provider_id',
        dateFunc: (doc) => doc['date'],
    },
    {
        repdao: 'starboard',
        polybase: 'starboard',
        provider: 'provider_id',
        dateFunc: (doc) => doc['onboarding_at'].substring(0, 10)
    },
    {
        repdao: 'stfil',
        polybase: 'stfil',
        provider: 'miner',
        dateFunc: (doc) => doc['date_stamp'],
    },
]

function epochToDate(epoch: number) {
    if (epoch  == undefined) {
        return undefined
    }
    var diff_ms =  epoch * 1000 * 30 // block time in seconds
    var date = diff_ms + new Date('2020-08-24T22:00Z').getTime() // filecoin network start time
    var converted_date = new Date(date)
    return converted_date.toISOString().substring(0, 10)
}
