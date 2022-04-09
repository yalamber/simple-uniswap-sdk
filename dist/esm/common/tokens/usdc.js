import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
/**
 * USDC token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var USDC = /** @class */ (function () {
    function USDC() {
    }
    USDC.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            decimals: 18,
            symbol: 'USDC',
            name: 'USD Coin',
        };
    };
    /**
     * Get USDC token info by chain id
     * @param chainId The chain id
     */
    USDC.token = function (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new UniswapError(chainId + " is not allowed", ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return USDC;
}());
export { USDC };
