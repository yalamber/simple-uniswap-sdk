import { JsonFragment } from '@ethersproject/abi';
export declare class UniswapContractContextV3 {
    /**
     * The uniswap router address
     */
    static routerAddress: string;
    /**
     * The uniswap factory address
     */
    static factoryAddress: string;
    /**
     * The uniswap quoter address
     */
    static quoterAddress: string;
    /**
     * Uniswap router
     */
    static routerAbi: JsonFragment[];
    /**
     * Uniswap factory
     */
    static factoryAbi: JsonFragment[];
    /**
     * Uniswap quoter
     */
    static quoterAbi: JsonFragment[];
}
