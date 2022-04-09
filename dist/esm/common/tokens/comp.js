import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
/**
 * COMP token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var COMP = /** @class */ (function () {
    function COMP() {
    }
    COMP.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
            decimals: 18,
            symbol: 'COMP',
            name: 'Compound',
        };
    };
    /**
     * Get COMP token info by chain id
     * @param chainId The chain id
     */
    COMP.token = function (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new UniswapError(chainId + " is not allowed", ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return COMP;
}());
export { COMP };
