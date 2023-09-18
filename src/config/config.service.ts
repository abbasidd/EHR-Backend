export default () => ({
    privateKey: process.env.PRIVATE_KEY,
    infuraRPCUrl: process.env.INFURA_WITH_RPC,
    cacheURL: process.env.CACHE_URL,
    chain: process.env.CHAIN || 'goerli',
    port: parseInt(process.env.PORT) || 3000,
})