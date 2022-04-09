import { BigNumber, BigNumberish, BytesLike as Arrayish } from 'ethers';
import { EthersProvider } from '../../../ethers-provider';
export declare class UniswapContractQuoterV3 {
    private _ethersProvider;
    private _quoterAddress;
    private _uniswapQuoterContract;
    constructor(_ethersProvider: EthersProvider, _quoterAddress?: string);
    WETH9(): Promise<string>;
    factory(): Promise<string>;
    quoteExactInput(path: Arrayish, amountIn: BigNumberish): Promise<BigNumber>;
}
