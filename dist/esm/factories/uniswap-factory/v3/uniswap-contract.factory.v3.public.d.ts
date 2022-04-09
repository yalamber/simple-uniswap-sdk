import { ChainIdAndProvider, EthereumProvider } from '../../../ethers-provider';
import { UniswapContractFactoryV3 } from './uniswap-contract.factory.v3';
export declare class UniswapContractFactoryV3Public extends UniswapContractFactoryV3 {
    constructor(providerContext: ChainIdAndProvider | EthereumProvider, factoryAddress?: string);
}
