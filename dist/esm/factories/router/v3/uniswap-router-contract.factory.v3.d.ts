import { BigNumberish, BytesLike } from 'ethers';
import { ExactInputSingleRequest, ExactOutputSingleRequest } from '../../../ABI/types/uniswap-router-v3';
import { EthersProvider } from '../../../ethers-provider';
export declare class UniswapRouterContractFactoryV3 {
    private _ethersProvider;
    private _routerAddress;
    private _uniswapRouterContract;
    constructor(_ethersProvider: EthersProvider, _routerAddress?: string);
    /**
     * Exact input single
     * @param params The parameters
     */
    exactInputSingle(params: ExactInputSingleRequest): string;
    /**
     * The exact output single
     * @param params The parameters
     */
    exactOutputSingle(params: ExactOutputSingleRequest): string;
    /**
     * Unwrap eth
     * @param amountMinimum The amount min
     * @param recipient The recipient
     */
    unwrapWETH9(amountMinimum: BigNumberish, recipient: string): string;
    /**
     * Multicall used for uniswap v3
     * @param data The data array (many calls)
     */
    multicall(data: BytesLike[]): string;
}
