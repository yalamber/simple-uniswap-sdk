var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ChainId } from '../../enums/chain-id';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
import { deepClone } from '../utils/deep-clone';
var ETH_PREFIX = '_ETH';
export var ETH_SYMBOL = 'ETH';
export var ETH_NAME = 'Ethers';
export var appendEthToContractAddress = function (contractAddress) {
    return "" + contractAddress + ETH_PREFIX;
};
export var removeEthFromContractAddress = function (contractAddress) {
    return contractAddress
        .replace(ETH_PREFIX, '')
        .replace(ETH_PREFIX.toLowerCase(), '');
};
export var isNativeEth = function (contractAddress) {
    return contractAddress.includes(ETH_PREFIX);
};
export var turnTokenIntoEthForResponse = function (token, nativeCurrencyInfo) {
    var clone = deepClone(token);
    // clear down contract address
    clone.contractAddress = 'NO_CONTRACT_ADDRESS';
    if (nativeCurrencyInfo) {
        clone.symbol = nativeCurrencyInfo.symbol;
        clone.name = nativeCurrencyInfo.name;
    }
    else {
        clone.symbol = ETH_SYMBOL;
        clone.name = ETH_NAME;
    }
    return clone;
};
/**
 * ETH token info
 */
var ETH = /** @class */ (function () {
    function ETH() {
    }
    ETH.MAINNET = function () {
        return {
            chainId: ChainId.MAINNET,
            contractAddress: appendEthToContractAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
            decimals: 18,
            symbol: ETH_SYMBOL,
            name: ETH_NAME,
        };
    };
    ETH.ROPSTEN = function () {
        return {
            chainId: ChainId.ROPSTEN,
            contractAddress: appendEthToContractAddress('0xc778417E063141139Fce010982780140Aa0cD5Ab'),
            decimals: 18,
            symbol: ETH_SYMBOL,
            name: ETH_NAME,
        };
    };
    ETH.RINKEBY = function () {
        return {
            chainId: ChainId.RINKEBY,
            contractAddress: appendEthToContractAddress('0xc778417E063141139Fce010982780140Aa0cD5Ab'),
            decimals: 18,
            symbol: ETH_SYMBOL,
            name: ETH_NAME,
        };
    };
    ETH.GORLI = function () {
        return {
            chainId: ChainId.GÖRLI,
            contractAddress: appendEthToContractAddress('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'),
            decimals: 18,
            symbol: ETH_SYMBOL,
            name: ETH_NAME,
        };
    };
    ETH.KOVAN = function () {
        return {
            chainId: ChainId.KOVAN,
            contractAddress: appendEthToContractAddress('0xd0A1E359811322d97991E03f863a0C30C2cF029C'),
            decimals: 18,
            symbol: ETH_SYMBOL,
            name: ETH_NAME,
        };
    };
    /**
     * Get ETH token info by chain id
     * @param chainId The chain id
     */
    ETH.info = function (chainId, customNetworkNativeWrappedTokenInfo) {
        if (customNetworkNativeWrappedTokenInfo === void 0) { customNetworkNativeWrappedTokenInfo = undefined; }
        if (customNetworkNativeWrappedTokenInfo) {
            return __assign(__assign({}, customNetworkNativeWrappedTokenInfo), { contractAddress: appendEthToContractAddress(customNetworkNativeWrappedTokenInfo.contractAddress) });
        }
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
    return ETH;
}());
export { ETH };
