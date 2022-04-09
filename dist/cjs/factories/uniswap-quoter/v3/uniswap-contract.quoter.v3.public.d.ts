import { ChainIdAndProvider, EthereumProvider } from '../../../ethers-provider';
import { UniswapContractQuoterV3 } from './uniswap-contract.quoter.v3';
export declare class UniswapContractQuoterV3Public extends UniswapContractQuoterV3 {
    constructor(providerContext: ChainIdAndProvider | EthereumProvider, quoterAddress?: string);
}
