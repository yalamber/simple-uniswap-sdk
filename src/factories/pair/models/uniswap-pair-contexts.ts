import { ChainId } from '../../../enums/chain-id';
import { UniswapPairSettings } from './uniswap-pair-settings';

interface UniswapPairContextBase {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
  ethereumAddress: string;
  settings?: UniswapPairSettings | undefined;
  fromTrasferFee?: boolean;
}

export interface UniswapPairContextForEthereumProvider
  extends UniswapPairContextBase {
  ethereumProvider: any;
}

export interface UniswapPairContextForChainId extends UniswapPairContextBase {
  chainId: ChainId | number;
}

export interface UniswapPairContextForProviderUrl
  extends UniswapPairContextForChainId {
  providerUrl: string;
}
