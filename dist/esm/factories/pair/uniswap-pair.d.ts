import { UniswapPairContextForChainId, UniswapPairContextForEthereumProvider, UniswapPairContextForProviderUrl } from './models/uniswap-pair-contexts';
import { UniswapPairFactory } from './uniswap-pair.factory';
export declare class UniswapPair {
    private _uniswapPairContext;
    private _ethersProvider;
    constructor(_uniswapPairContext: UniswapPairContextForChainId | UniswapPairContextForProviderUrl | UniswapPairContextForEthereumProvider);
    /**
     * Create factory to be able to call methods on the 2 tokens
     */
    createFactory(): Promise<UniswapPairFactory>;
}
