var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { ContractContext } from '../../common/contract-context';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { ETH, isNativeEth } from '../../common/tokens/eth';
import { isTokenOverrideInfo } from '../../common/tokens/overrides';
import { getAddress } from '../../common/utils/get-address';
import { CustomMulticall } from '../../custom-multicall';
import { UniswapVersion } from '../../enums/uniswap-version';
import { uniswapContracts } from '../../uniswap-contract-context/get-uniswap-contracts';
var TokensFactory = /** @class */ (function () {
    function TokensFactory(_ethersProvider, _customNetwork, _cloneUniswapContractDetails) {
        var _a;
        this._ethersProvider = _ethersProvider;
        this._customNetwork = _customNetwork;
        this._cloneUniswapContractDetails = _cloneUniswapContractDetails;
        this._multicall = new CustomMulticall(this._ethersProvider.provider, (_a = this._customNetwork) === null || _a === void 0 ? void 0 : _a.multicallContractAddress);
    }
    /**
     * Get the tokens details
     */
    TokensFactory.prototype.getTokens = function (tokenContractAddresses) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokens, SYMBOL, DECIMALS, NAME, contractCallContexts, i, overridenToken, contractCallContext, contractCallResults, result, tokenInfo, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        tokens = [];
                        SYMBOL = 0;
                        DECIMALS = 1;
                        NAME = 2;
                        contractCallContexts = [];
                        for (i = 0; i < tokenContractAddresses.length; i++) {
                            if (!isNativeEth(tokenContractAddresses[i])) {
                                overridenToken = isTokenOverrideInfo(tokenContractAddresses[i]);
                                if (overridenToken) {
                                    tokens.push(overridenToken);
                                    continue;
                                }
                                contractCallContext = {
                                    reference: "token" + i,
                                    contractAddress: getAddress(tokenContractAddresses[i]),
                                    abi: ContractContext.erc20Abi,
                                    calls: [
                                        {
                                            reference: 'symbol',
                                            methodName: 'symbol',
                                            methodParameters: [],
                                        },
                                        {
                                            reference: 'decimals',
                                            methodName: 'decimals',
                                            methodParameters: [],
                                        },
                                        {
                                            reference: 'name',
                                            methodName: 'name',
                                            methodParameters: [],
                                        },
                                    ],
                                };
                                contractCallContexts.push(contractCallContext);
                            }
                            else {
                                tokens.push(ETH.info(this._ethersProvider.network().chainId, (_a = this._customNetwork) === null || _a === void 0 ? void 0 : _a.nativeWrappedTokenInfo));
                            }
                        }
                        return [4 /*yield*/, this._multicall.call(contractCallContexts)];
                    case 1:
                        contractCallResults = _b.sent();
                        for (result in contractCallResults.results) {
                            tokenInfo = contractCallResults.results[result];
                            tokens.push({
                                chainId: this._ethersProvider.network().chainId,
                                contractAddress: tokenInfo.originalContractCallContext.contractAddress,
                                symbol: tokenInfo.callsReturnContext[SYMBOL].returnValues[0],
                                decimals: tokenInfo.callsReturnContext[DECIMALS].returnValues[0],
                                name: tokenInfo.callsReturnContext[NAME].returnValues[0],
                            });
                        }
                        return [2 /*return*/, tokens];
                    case 2:
                        error_1 = _b.sent();
                        throw new UniswapError('invalid from or to contract tokens', ErrorCodes.invalidFromOrToContractToken);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get allowance and balance for many contracts
     * @param ethereumAddress The ethereum address
     * @param tokenContractAddresses The token contract addresses
     * @param format If you want it to format it for you to the correct decimal place
     */
    TokensFactory.prototype.getAllowanceAndBalanceOfForContracts = function (ethereumAddress, tokenContractAddresses, format) {
        var _a, _b, _c;
        if (format === void 0) { format = false; }
        return __awaiter(this, void 0, void 0, function () {
            var results, ALLOWANCE, BALANCEOF, DECIMALS, SYMBOL, NAME, contractCallContexts, i, token, _d, _e, _f, _g, _h, contractCallResults, result, overridenTokenInfo, resultInfoV2, resultInfoV3, decimals;
            var _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        results = [];
                        ALLOWANCE = 0;
                        BALANCEOF = 1;
                        DECIMALS = 2;
                        SYMBOL = 3;
                        NAME = 4;
                        contractCallContexts = [];
                        i = 0;
                        _o.label = 1;
                    case 1:
                        if (!(i < tokenContractAddresses.length)) return [3 /*break*/, 7];
                        if (!!isNativeEth(tokenContractAddresses[i])) return [3 /*break*/, 2];
                        contractCallContexts.push(this.buildAllowanceAndBalanceContractCallContext(ethereumAddress, tokenContractAddresses[i], UniswapVersion.v2));
                        contractCallContexts.push(this.buildAllowanceAndBalanceContractCallContext(ethereumAddress, tokenContractAddresses[i], UniswapVersion.v3));
                        return [3 /*break*/, 6];
                    case 2:
                        token = ETH.info(this._ethersProvider.network().chainId, (_a = this._customNetwork) === null || _a === void 0 ? void 0 : _a.nativeWrappedTokenInfo);
                        if (!format) return [3 /*break*/, 4];
                        _e = (_d = results).push;
                        _j = {};
                        _k = {
                            allowanceV2: new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
                                .shiftedBy(18 * -1)
                                .toFixed(),
                            allowanceV3: new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
                                .shiftedBy(18 * -1)
                                .toFixed()
                        };
                        _f = BigNumber.bind;
                        return [4 /*yield*/, this._ethersProvider.balanceOf(ethereumAddress)];
                    case 3:
                        _e.apply(_d, [(_j.allowanceAndBalanceOf = (_k.balanceOf = new (_f.apply(BigNumber, [void 0, _o.sent()]))()
                                .shiftedBy(18 * -1)
                                .toFixed(),
                                _k),
                                _j.token = token,
                                _j)]);
                        return [3 /*break*/, 6];
                    case 4:
                        _h = (_g = results).push;
                        _l = {};
                        _m = {
                            allowanceV2: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                            allowanceV3: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                        };
                        return [4 /*yield*/, this._ethersProvider.balanceOf(ethereumAddress)];
                    case 5:
                        _h.apply(_g, [(_l.allowanceAndBalanceOf = (_m.balanceOf = _o.sent(),
                                _m),
                                _l.token = ETH.info(this._ethersProvider.network().chainId, (_b = this._customNetwork) === null || _b === void 0 ? void 0 : _b.nativeWrappedTokenInfo),
                                _l)]);
                        _o.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7: return [4 /*yield*/, this._multicall.call(contractCallContexts)];
                    case 8:
                        contractCallResults = _o.sent();
                        for (result in contractCallResults.results) {
                            if (result.includes("_" + UniswapVersion.v2)) {
                                overridenTokenInfo = (_c = contractCallResults.results[result].originalContractCallContext
                                    .context) === null || _c === void 0 ? void 0 : _c.overridenToken;
                                resultInfoV2 = contractCallResults.results[result];
                                resultInfoV3 = contractCallResults.results[result.replace("_" + UniswapVersion.v2, "_" + UniswapVersion.v3)];
                                if (!format) {
                                    results.push({
                                        allowanceAndBalanceOf: {
                                            allowanceV2: EthersBigNumber.from(resultInfoV2.callsReturnContext[ALLOWANCE].returnValues[0]).toHexString(),
                                            allowanceV3: EthersBigNumber.from(resultInfoV3.callsReturnContext[ALLOWANCE].returnValues[0]).toHexString(),
                                            balanceOf: EthersBigNumber.from(resultInfoV3.callsReturnContext[BALANCEOF].returnValues[0]).toHexString(),
                                        },
                                        token: overridenTokenInfo !== undefined
                                            ? overridenTokenInfo
                                            : {
                                                chainId: this._ethersProvider.network().chainId,
                                                contractAddress: resultInfoV3.originalContractCallContext.contractAddress,
                                                symbol: resultInfoV3.callsReturnContext[SYMBOL].returnValues[0],
                                                decimals: resultInfoV3.callsReturnContext[DECIMALS].returnValues[0],
                                                name: resultInfoV3.callsReturnContext[NAME].returnValues[0],
                                            },
                                    });
                                }
                                else {
                                    decimals = overridenTokenInfo !== undefined
                                        ? overridenTokenInfo.decimals
                                        : resultInfoV2.callsReturnContext[DECIMALS].returnValues[0];
                                    results.push({
                                        allowanceAndBalanceOf: {
                                            allowanceV2: new BigNumber(EthersBigNumber.from(resultInfoV2.callsReturnContext[ALLOWANCE].returnValues[0]).toHexString())
                                                .shiftedBy(decimals * -1)
                                                .toFixed(),
                                            allowanceV3: new BigNumber(EthersBigNumber.from(resultInfoV3.callsReturnContext[ALLOWANCE].returnValues[0]).toHexString())
                                                .shiftedBy(decimals * -1)
                                                .toFixed(),
                                            balanceOf: new BigNumber(EthersBigNumber.from(resultInfoV3.callsReturnContext[BALANCEOF].returnValues[0]).toHexString())
                                                .shiftedBy(decimals * -1)
                                                .toFixed(),
                                        },
                                        token: overridenTokenInfo !== undefined
                                            ? overridenTokenInfo
                                            : {
                                                chainId: this._ethersProvider.network().chainId,
                                                contractAddress: resultInfoV3.originalContractCallContext.contractAddress,
                                                symbol: resultInfoV3.callsReturnContext[SYMBOL].returnValues[0],
                                                decimals: resultInfoV3.callsReturnContext[DECIMALS].returnValues[0],
                                                name: resultInfoV3.callsReturnContext[NAME].returnValues[0],
                                            },
                                    });
                                }
                            }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    TokensFactory.prototype.buildAllowanceAndBalanceContractCallContext = function (ethereumAddress, tokenContractAddress, uniswapVersion) {
        var defaultCallContext = {
            reference: tokenContractAddress + "_" + uniswapVersion,
            contractAddress: getAddress(tokenContractAddress),
            abi: ContractContext.erc20Abi,
            calls: [
                {
                    reference: 'allowance',
                    methodName: 'allowance',
                    methodParameters: [
                        ethereumAddress,
                        uniswapVersion === UniswapVersion.v2
                            ? uniswapContracts.v2.getRouterAddress(this._cloneUniswapContractDetails)
                            : uniswapContracts.v3.getRouterAddress(this._cloneUniswapContractDetails),
                    ],
                },
                {
                    reference: 'balanceOf',
                    methodName: 'balanceOf',
                    methodParameters: [ethereumAddress],
                },
            ],
        };
        var overridenToken = isTokenOverrideInfo(tokenContractAddress);
        if (overridenToken) {
            defaultCallContext.context = { overridenToken: overridenToken };
        }
        else {
            defaultCallContext.calls.push({
                reference: 'decimals',
                methodName: 'decimals',
                methodParameters: [],
            }, {
                reference: 'symbol',
                methodName: 'symbol',
                methodParameters: [],
            }, {
                reference: 'name',
                methodName: 'name',
                methodParameters: [],
            });
        }
        return defaultCallContext;
    };
    return TokensFactory;
}());
export { TokensFactory };
