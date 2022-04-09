import { ChainId } from '../../../enums/chain-id';
/**
 * DFORCE token contract
 */
var DFORCE = /** @class */ (function () {
    function DFORCE() {
    }
    DFORCE.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0',
            decimals: 18,
            symbol: 'DF',
            name: 'dForce token',
        };
    };
    return DFORCE;
}());
export { DFORCE };
