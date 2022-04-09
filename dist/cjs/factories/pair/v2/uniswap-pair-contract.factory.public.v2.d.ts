import { ChainIdAndProvider, EthereumProvider } from '../../../ethers-provider';
import { UniswapPairContractFactoryV2 } from './uniswap-pair-contract.factory.v2';
export declare class UniswapPairContractFactoryPublicV2 extends UniswapPairContractFactoryV2 {
    constructor(providerContext: ChainIdAndProvider | EthereumProvider, pairAddress?: string);
}
