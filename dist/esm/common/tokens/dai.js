import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
/**
 * DAI token context CHANGE CONTRACT ADDRESS INFO ETC
 */
var DAI = /** @class */ (function () {
    function DAI() {
    }
    DAI.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            decimals: 18,
            symbol: 'DAI',
            name: 'Dai Stablecoin',
        };
    };
    /**
     * Get DAI token info by chain id
     * @param chainId The chain id
     */
    DAI.token = function (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                return this.MAINNET();
            default:
                throw new UniswapError(chainId + " is not allowed", ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return DAI;
}());
export { DAI };
