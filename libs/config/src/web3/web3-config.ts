import { ABI } from './abi';

export const WEB3_CONFIG = {
    ABI,
    INFURA_SECRET_KEY: process.env.INFURA_SECRET_KEY || '83cf33a11da94d05a2dd30939639d76b',
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || '0x352F8C1f8576183b6c783D3e589aBB69FfBeBc47',
    INFURA_HTTPS_ENDPOINT: process.env.INFURA_HTTPS_ENDPOINT || 'https://goerli.infura.io/v3/ff194713efd1443c9704c3ccd2187ad0',
    INFURA_WSS_ENDPOINT: process.env.INFURA_WSS_ENDPOINT || 'wss://goerli.infura.io/ws/v3/ff194713efd1443c9704c3ccd2187ad0',
    SECRET_PHRASE: process.env.SECRET_PHRASE || 'owner super essay kangaroo same virtual predict solid ring absurd canoe merit'
};
