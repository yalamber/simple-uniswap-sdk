import { BigNumberish } from 'ethers';
import { EthersProvider } from '../../../ethers-provider';
export declare class UniswapContractFactoryV3 {
    private _ethersProvider;
    private _factoryAddress;
    private _uniswapFactoryContract;
    constructor(_ethersProvider: EthersProvider, _factoryAddress?: string);
    createPool(tokenA: string, tokenB: string, fee: BigNumberish): string;
    getPool(token0: string, token1: string, fee: BigNumberish): Promise<string>;
}
