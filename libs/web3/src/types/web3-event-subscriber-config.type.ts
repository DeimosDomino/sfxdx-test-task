import { AbiItem } from 'web3-utils';

export type Web3EventSubscriberConfig = {
    abi: AbiItem[] | AbiItem;
    infura_endpoint: string;
    secret_key: string;
    secret_phrase: string;
    contract_address: string;
};
