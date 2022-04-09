import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
export var WETH_SYMBOL = 'WETH';
export var WETH_NAME = 'Wrapped Ether';
/**
 * WETH token context (called `WETHContract` so people get a breaking changes if they use the old name of `WETH`)
 */
var WETHContract = /** @class */ (function () {
    function WETHContract() {
    }
    WETHContract.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            decimals: 18,
            symbol: WETH_SYMBOL,
            name: WETH_NAME,
        };
    };
    WETHContract.ROPSTEN = function () {
        return {
            chainId: ChainId.ROPSTEN,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: WETH_SYMBOL,
            name: WETH_NAME,
        };
    };
    WETHContract.RINKEBY = function () {
        return {
            chainId: ChainId.RINKEBY,
            contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
            decimals: 18,
            symbol: WETH_SYMBOL,
            name: WETH_NAME,
        };
    };
    WETHContract.GORLI = function () {
        return {
            chainId: ChainId.GÖRLI,
            contractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
            decimals: 18,
            symbol: WETH_SYMBOL,
            name: WETH_NAME,
        };
    };
    WETHContract.KOVAN = function () {
        return {
            chainId: ChainId.KOVAN,
            contractAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
            decimals: 18,
            symbol: WETH_SYMBOL,
            name: WETH_NAME,
        };
    };
    /**
     * Get WETH token info by chain id
     * @param chainId The chain id
     */
    WETHContract.token = function (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                return this.MAINNET();
            case ChainId.ROPSTEN:
                return this.ROPSTEN();
            case ChainId.RINKEBY:
                return this.RINKEBY();
            case ChainId.GÖRLI:
                return this.GORLI();
            case ChainId.KOVAN:
                return this.KOVAN();
            default:
                throw new UniswapError(chainId + " is not allowed", ErrorCodes.tokenChainIdContractDoesNotExist);
        }
    };
    return WETHContract;
}());
export { WETHContract };
