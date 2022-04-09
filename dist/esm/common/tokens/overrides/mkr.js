import { ChainId } from '../../../enums/chain-id';
/**
 * MAI token contract
 */
var MAI = /** @class */ (function () {
    function MAI() {
    }
    MAI.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
            decimals: 18,
            symbol: 'MAI',
            name: 'MAI token',
        };
    };
    return MAI;
}());
export { MAI };
