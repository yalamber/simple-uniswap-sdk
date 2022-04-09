import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
/**
 * USDT token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var USDT = /** @class */ (function () {
    function USDT() {
    }
    USDT.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            decimals: 18,
            symbol: 'USDT',
            name: 'Tether USD',
        };
    };
    /**
     * Get USDT token info by chain id
     * @param chainId The chain id
     */
    USDT.token = function (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new UniswapError(chainId + " is not allowed", ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return USDT;
}());
export { USDT };
