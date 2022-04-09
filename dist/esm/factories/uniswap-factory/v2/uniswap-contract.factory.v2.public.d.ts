import { ChainIdAndProvider, EthereumProvider } from '../../../ethers-provider';
import { UniswapContractFactoryV2 } from './uniswap-contract.factory.v2';
export declare class UniswapContractFactoryV2Public extends UniswapContractFactoryV2 {
    constructor(providerContext: ChainIdAndProvider | EthereumProvider, factoryAddress?: string);
}
