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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import BigNumber from 'bignumber.js';
import { Constants } from '../../common/constants';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { COMP } from '../../common/tokens/comp';
import { DAI } from '../../common/tokens/dai';
import { ETH_SYMBOL, isNativeEth, removeEthFromContractAddress, turnTokenIntoEthForResponse, } from '../../common/tokens/eth';
import { USDC } from '../../common/tokens/usdc';
import { USDT } from '../../common/tokens/usdt';
import { WBTC } from '../../common/tokens/wbtc';
import { WETHContract } from '../../common/tokens/weth';
import { deepClone } from '../../common/utils/deep-clone';
import { formatEther } from '../../common/utils/format-ether';
import { hexlify } from '../../common/utils/hexlify';
import { onlyUnique } from '../../common/utils/only-unique';
import { parseEther } from '../../common/utils/parse-ether';
import { toEthersBigNumber } from '../../common/utils/to-ethers-big-number';
import { getTradePath } from '../../common/utils/trade-path';
import { CustomMulticall } from '../../custom-multicall';
import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { UniswapVersion } from '../../enums/uniswap-version';
import { uniswapContracts } from '../../uniswap-contract-context/get-uniswap-contracts';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractContextV3 } from '../../uniswap-contract-context/uniswap-contract-context-v3';
import { TradeDirection } from '../pair/models/trade-direction';
import { TokensFactory } from '../token/tokens.factory';
import { RouterDirection } from './enums/router-direction';
import { UniswapRouterContractFactoryV2 } from './v2/uniswap-router-contract.factory.v2';
import { FeeAmount, feeToPercent, percentToFeeAmount, } from './v3/enums/fee-amount-v3';
import { UniswapRouterContractFactoryV3 } from './v3/uniswap-router-contract.factory.v3';
var UniswapRouterFactory = /** @class */ (function () {
    function UniswapRouterFactory(_coinGecko, _ethereumAddress, _fromToken, _toToken, _settings, _ethersProvider) {
        var _a, _b;
        this._coinGecko = _coinGecko;
        this._ethereumAddress = _ethereumAddress;
        this._fromToken = _fromToken;
        this._toToken = _toToken;
        this._settings = _settings;
        this._ethersProvider = _ethersProvider;
        this._multicall = new CustomMulticall(this._ethersProvider.provider, (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.multicallContractAddress);
        this._uniswapRouterContractFactoryV2 = new UniswapRouterContractFactoryV2(this._ethersProvider, uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails));
        this._uniswapRouterContractFactoryV3 = new UniswapRouterContractFactoryV3(this._ethersProvider, uniswapContracts.v3.getRouterAddress(this._settings.cloneUniswapContractDetails));
        this._tokensFactory = new TokensFactory(this._ethersProvider, this._settings.customNetwork, this._settings.cloneUniswapContractDetails);
        this.LIQUIDITY_PROVIDER_FEE_V2 = 0.003;
    }
    /**
     * Get all possible routes will only go up to 4 due to gas increase the more routes
     * you go.
     */
    UniswapRouterFactory.prototype.getAllPossibleRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var findPairs, contractCallContext, pairs, tokenPairs, fromToken, toToken, allPossibleRoutes, contractCallResults, results, availablePairs, fromTokenRoutes, toTokenRoutes, allMainRoutes, i, fromTokenPairs, toTokenPairs, results, i, liquidityProviderFee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findPairs = [];
                        if (!this._settings.disableMultihops) {
                            findPairs = [
                                this.mainCurrenciesPairsForFromToken,
                                this.mainCurrenciesPairsForToToken,
                                this.mainCurrenciesPairsForUSDT,
                                this.mainCurrenciesPairsForCOMP,
                                this.mainCurrenciesPairsForDAI,
                                this.mainCurrenciesPairsForUSDC,
                                this.mainCurrenciesPairsForWETH,
                                this.mainCurrenciesPairsForWBTC,
                                [[this._fromToken, this._toToken]],
                            ];
                        }
                        else {
                            // multihops turned off so only go direct
                            findPairs = [[[this._fromToken, this._toToken]]];
                        }
                        contractCallContext = [];
                        if (this._settings.uniswapVersions.includes(UniswapVersion.v2)) {
                            contractCallContext.push({
                                reference: UniswapVersion.v2,
                                contractAddress: uniswapContracts.v2.getPairAddress(this._settings.cloneUniswapContractDetails),
                                abi: UniswapContractContextV2.pairAbi,
                                calls: [],
                            });
                            for (pairs = 0; pairs < findPairs.length; pairs++) {
                                for (tokenPairs = 0; tokenPairs < findPairs[pairs].length; tokenPairs++) {
                                    fromToken = findPairs[pairs][tokenPairs][0];
                                    toToken = findPairs[pairs][tokenPairs][1];
                                    contractCallContext[0].calls.push({
                                        reference: fromToken.contractAddress + "-" + toToken.contractAddress + "-" + fromToken.symbol + "/" + toToken.symbol,
                                        methodName: 'getPair',
                                        methodParameters: [
                                            removeEthFromContractAddress(fromToken.contractAddress),
                                            removeEthFromContractAddress(toToken.contractAddress),
                                        ],
                                    });
                                }
                            }
                        }
                        // for now v3 quotes will just be direct aka UNI > AAVE etc!
                        if (this._settings.uniswapVersions.includes(UniswapVersion.v3)) {
                            contractCallContext.push({
                                reference: UniswapVersion.v3,
                                contractAddress: uniswapContracts.v3.getFactoryAddress(this._settings.cloneUniswapContractDetails),
                                abi: UniswapContractContextV3.factoryAbi,
                                calls: [
                                    {
                                        reference: this._fromToken.contractAddress + "-" + this._toToken.contractAddress + "-" + this._fromToken.symbol + "/" + this._toToken.symbol,
                                        methodName: 'getPool',
                                        methodParameters: [
                                            removeEthFromContractAddress(this._fromToken.contractAddress),
                                            removeEthFromContractAddress(this._toToken.contractAddress),
                                            FeeAmount.LOW,
                                        ],
                                    },
                                    {
                                        reference: this._fromToken.contractAddress + "-" + this._toToken.contractAddress + "-" + this._fromToken.symbol + "/" + this._toToken.symbol,
                                        methodName: 'getPool',
                                        methodParameters: [
                                            removeEthFromContractAddress(this._fromToken.contractAddress),
                                            removeEthFromContractAddress(this._toToken.contractAddress),
                                            FeeAmount.MEDIUM,
                                        ],
                                    },
                                    {
                                        reference: this._fromToken.contractAddress + "-" + this._toToken.contractAddress + "-" + this._fromToken.symbol + "/" + this._toToken.symbol,
                                        methodName: 'getPool',
                                        methodParameters: [
                                            removeEthFromContractAddress(this._fromToken.contractAddress),
                                            removeEthFromContractAddress(this._toToken.contractAddress),
                                            FeeAmount.HIGH,
                                        ],
                                    },
                                ],
                            });
                        }
                        allPossibleRoutes = { v2: [], v3: [] };
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 1:
                        contractCallResults = _a.sent();
                        if (this._settings.uniswapVersions.includes(UniswapVersion.v2)) {
                            results = contractCallResults.results[UniswapVersion.v2];
                            availablePairs = results.callsReturnContext.filter(function (c) {
                                return c.returnValues[0] !== '0x0000000000000000000000000000000000000000';
                            });
                            fromTokenRoutes = {
                                token: this._fromToken,
                                pairs: {
                                    fromTokenPairs: this.getTokenAvailablePairs(this._fromToken, availablePairs, RouterDirection.from),
                                },
                            };
                            toTokenRoutes = {
                                token: this._toToken,
                                pairs: {
                                    toTokenPairs: this.getTokenAvailablePairs(this._toToken, availablePairs, RouterDirection.to),
                                },
                            };
                            allMainRoutes = [];
                            for (i = 0; i < this.allMainTokens.length; i++) {
                                fromTokenPairs = this.getTokenAvailablePairs(this.allMainTokens[i], availablePairs, RouterDirection.from);
                                toTokenPairs = this.getTokenAvailablePairs(this.allMainTokens[i], availablePairs, RouterDirection.to);
                                allMainRoutes.push({
                                    token: this.allMainTokens[i],
                                    pairs: { fromTokenPairs: fromTokenPairs, toTokenPairs: toTokenPairs },
                                });
                            }
                            // console.log(JSON.stringify(allMainRoutes, null, 4));
                            allPossibleRoutes.v2 = this.workOutAllPossibleRoutes(fromTokenRoutes, toTokenRoutes, allMainRoutes);
                        }
                        if (this._settings.uniswapVersions.includes(UniswapVersion.v3)) {
                            results = contractCallResults.results[UniswapVersion.v3];
                            for (i = 0; i < results.callsReturnContext.length; i++) {
                                if (results.callsReturnContext[i].returnValues[0] !==
                                    '0x0000000000000000000000000000000000000000') {
                                    liquidityProviderFee = void 0;
                                    switch (i) {
                                        case 0:
                                            liquidityProviderFee = FeeAmount.LOW;
                                            break;
                                        case 1:
                                            liquidityProviderFee = FeeAmount.MEDIUM;
                                            break;
                                        case 2:
                                            liquidityProviderFee = FeeAmount.HIGH;
                                            break;
                                    }
                                    allPossibleRoutes.v3.push({
                                        route: [this._fromToken, this._toToken],
                                        liquidityProviderFee: feeToPercent(liquidityProviderFee),
                                    });
                                }
                            }
                        }
                        // console.log(JSON.stringify(allPossibleRoutes, null, 4));
                        return [2 /*return*/, allPossibleRoutes];
                }
            });
        });
    };
    /**
     * Get all possible routes with the quotes
     * @param amountToTrade The amount to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.getAllPossibleRoutesWithQuotes = function (amountToTrade, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var tradeAmount, routes, contractCallContext, i, routeCombo, i, routeCombo, contractCallResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tradeAmount = this.formatAmountToTrade(amountToTrade, direction);
                        return [4 /*yield*/, this.getAllPossibleRoutes()];
                    case 1:
                        routes = _a.sent();
                        contractCallContext = [];
                        if (this._settings.uniswapVersions.includes(UniswapVersion.v2)) {
                            contractCallContext.push({
                                reference: UniswapVersion.v2,
                                contractAddress: uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails),
                                abi: UniswapContractContextV2.routerAbi,
                                calls: [],
                                context: routes.v2,
                            });
                            for (i = 0; i < routes.v2.length; i++) {
                                routeCombo = routes.v2[i].route.map(function (c) {
                                    return removeEthFromContractAddress(c.contractAddress);
                                });
                                contractCallContext[0].calls.push({
                                    reference: "route" + i,
                                    methodName: direction === TradeDirection.input
                                        ? 'getAmountsOut'
                                        : 'getAmountsIn',
                                    methodParameters: [tradeAmount, routeCombo],
                                });
                            }
                        }
                        if (this._settings.uniswapVersions.includes(UniswapVersion.v3)) {
                            contractCallContext.push({
                                reference: UniswapVersion.v3,
                                contractAddress: uniswapContracts.v3.getQuoterAddress(this._settings.cloneUniswapContractDetails),
                                abi: UniswapContractContextV3.quoterAbi,
                                calls: [],
                                context: routes.v3,
                            });
                            for (i = 0; i < routes.v3.length; i++) {
                                routeCombo = routes.v3[i].route.map(function (c) {
                                    return removeEthFromContractAddress(c.contractAddress);
                                });
                                contractCallContext[this._settings.uniswapVersions.includes(UniswapVersion.v2) ? 1 : 0].calls.push({
                                    reference: "route" + i,
                                    methodName: direction === TradeDirection.input
                                        ? 'quoteExactInputSingle'
                                        : 'quoteExactOutputSingle',
                                    methodParameters: [
                                        routeCombo[0],
                                        routeCombo[1],
                                        percentToFeeAmount(routes.v3[i].liquidityProviderFee),
                                        tradeAmount,
                                        0,
                                    ],
                                });
                            }
                        }
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 2:
                        contractCallResults = _a.sent();
                        return [2 /*return*/, this.buildRouteQuotesFromResults(amountToTrade, contractCallResults, direction)];
                }
            });
        });
    };
    /**
     * Finds the best route
     * @param amountToTrade The amount they want to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.findBestRoute = function (amountToTrade, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var allRoutes, allowanceAndBalances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllPossibleRoutesWithQuotes(amountToTrade, direction)];
                    case 1:
                        allRoutes = _a.sent();
                        if (allRoutes.length === 0) {
                            throw new UniswapError("No routes found for " + this._fromToken.symbol + " > " + this._toToken.symbol, ErrorCodes.noRoutesFound);
                        }
                        return [4 /*yield*/, this.hasEnoughAllowanceAndBalance(amountToTrade, allRoutes[0], direction)];
                    case 2:
                        allowanceAndBalances = _a.sent();
                        if (!(this._ethersProvider.provider.network.chainId === ChainId.MAINNET &&
                            this._settings.gasSettings &&
                            allowanceAndBalances.enoughBalance)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.filterWithTransactionFees(allRoutes, allowanceAndBalances.enoughV2Allowance, allowanceAndBalances.enoughV3Allowance)];
                    case 3:
                        allRoutes = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            bestRouteQuote: allRoutes[0],
                            triedRoutesQuote: allRoutes.map(function (route) {
                                return {
                                    expectedConvertQuote: route.expectedConvertQuote,
                                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: route.expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                                    transaction: route.transaction,
                                    tradeExpires: route.tradeExpires,
                                    routePathArrayTokenMap: route.routePathArrayTokenMap,
                                    routeText: route.routeText,
                                    routePathArray: route.routePathArray,
                                    uniswapVersion: route.uniswapVersion,
                                    liquidityProviderFee: route.liquidityProviderFee,
                                    quoteDirection: route.quoteDirection,
                                    gasPriceEstimatedBy: route.gasPriceEstimatedBy,
                                };
                            }),
                            hasEnoughBalance: allowanceAndBalances.enoughBalance,
                            fromBalance: allowanceAndBalances.fromBalance,
                            toBalance: allowanceAndBalances.toBalance,
                            hasEnoughAllowance: allRoutes[0].uniswapVersion === UniswapVersion.v2
                                ? allowanceAndBalances.enoughV2Allowance
                                : allowanceAndBalances.enoughV3Allowance,
                        }];
                }
            });
        });
    };
    /**
     * Generates the trade datetime unix time
     */
    UniswapRouterFactory.prototype.generateTradeDeadlineUnixTime = function () {
        var now = new Date();
        var expiryDate = new Date(now.getTime() + this._settings.deadlineMinutes * 60000);
        return (expiryDate.getTime() / 1e3) | 0;
    };
    /**
     * Get eth balance
     */
    UniswapRouterFactory.prototype.getEthBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._ethersProvider.balanceOf(this._ethereumAddress)];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, new BigNumber(balance).shiftedBy(Constants.ETH_MAX_DECIMALS * -1)];
                }
            });
        });
    };
    /**
     * Generate trade data eth > erc20
     * @param ethAmountIn The eth amount in
     * @param tokenAmount The token amount
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataEthToErc20Input = function (ethAmountIn, tokenAmount, routeQuoteTradeContext, deadline, transferFee) {
        if (transferFee === void 0) { transferFee = false; }
        // uniswap adds extra digits on even if the token is say 8 digits long
        var convertedMinTokens = tokenAmount
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case UniswapVersion.v2:
                if (transferFee) {
                    return this._uniswapRouterContractFactoryV2.swapExactETHForTokensSupportingFeeOnTransferTokens(hexlify(convertedMinTokens), routeQuoteTradeContext.routePathArray.map(function (r) {
                        return removeEthFromContractAddress(r);
                    }), this._ethereumAddress, deadline);
                }
                return this._uniswapRouterContractFactoryV2.swapExactETHForTokens(hexlify(convertedMinTokens), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return removeEthFromContractAddress(r);
                }), this._ethereumAddress, deadline);
            case UniswapVersion.v3:
                return this.generateTradeDataForV3Input(parseEther(ethAmountIn), convertedMinTokens, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new UniswapError('Uniswap version not supported', ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade data eth > erc20
     * @param tokenAmountInMax The amount in max
     * @param ethAmountOut The amount to receive
     * @param routeQuote The route quote
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataEthToErc20Output = function (ethAmountInMax, tokenAmountOut, routeQuoteTradeContext, deadline) {
        var amountOut = tokenAmountOut
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapETHForExactTokens(hexlify(amountOut), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return removeEthFromContractAddress(r);
                }), this._ethereumAddress, deadline);
            case UniswapVersion.v3:
                return this.generateTradeDataForV3Output(amountOut, parseEther(ethAmountInMax), routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new UniswapError('Uniswap version not supported', ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > eth for input direction
     * @param tokenAmount The amount in
     * @param ethAmountOutMin The min amount to receive
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToEthInput = function (tokenAmount, ethAmountOutMin, routeQuoteTradeContext, deadline, transferFee) {
        if (transferFee === void 0) { transferFee = false; }
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountIn = tokenAmount
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case UniswapVersion.v2:
                if (transferFee) {
                    return this._uniswapRouterContractFactoryV2.swapExactTokensForETHSupportingFeeOnTransferTokens(hexlify(amountIn), hexlify(parseEther(ethAmountOutMin)), routeQuoteTradeContext.routePathArray.map(function (r) {
                        return removeEthFromContractAddress(r);
                    }), this._ethereumAddress, deadline);
                }
                return this._uniswapRouterContractFactoryV2.swapExactTokensForETH(hexlify(amountIn), hexlify(parseEther(ethAmountOutMin)), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return removeEthFromContractAddress(r);
                }), this._ethereumAddress, deadline);
            case UniswapVersion.v3:
                return this.generateTradeDataForV3Input(amountIn, parseEther(ethAmountOutMin), routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new UniswapError('Uniswap version not supported', ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > eth for input direction
     * @param tokenAmountInMax The amount in max
     * @param ethAmountOut The amount to receive
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToEthOutput = function (tokenAmountInMax, ethAmountOut, routeQuoteTradeContext, deadline) {
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountInMax = tokenAmountInMax
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapTokensForExactETH(hexlify(parseEther(ethAmountOut)), hexlify(amountInMax), routeQuoteTradeContext.routePathArray.map(function (r) {
                    return removeEthFromContractAddress(r);
                }), this._ethereumAddress, deadline);
            case UniswapVersion.v3:
                return this.generateTradeDataForV3Output(parseEther(ethAmountOut), amountInMax, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new UniswapError('Uniswap version not supported', ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > erc20 for input
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToErc20Input = function (tokenAmount, tokenAmountMin, routeQuoteTradeContext, deadline, transferFee) {
        if (transferFee === void 0) { transferFee = false; }
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountIn = tokenAmount
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        var amountMin = tokenAmountMin
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case UniswapVersion.v2:
                if (transferFee) {
                    return this._uniswapRouterContractFactoryV2.swapExactTokensForTokensSupportingFeeOnTransferTokens(hexlify(amountIn), hexlify(amountMin), routeQuoteTradeContext.routePathArray, this._ethereumAddress, deadline);
                }
                return this._uniswapRouterContractFactoryV2.swapExactTokensForTokens(hexlify(amountIn), hexlify(amountMin), routeQuoteTradeContext.routePathArray, this._ethereumAddress, deadline);
            case UniswapVersion.v3:
                return this.generateTradeDataForV3Input(amountIn, amountMin, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new UniswapError('Uniswap version not supported', ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade amount erc20 > erc20 for output
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param routeQuoteTradeContext The route quote trade context
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataErc20ToErc20Output = function (tokenAmountInMax, tokenAmountOut, routeQuoteTradeContext, deadline) {
        // uniswap adds extra digits on even if the token is say 8 digits long
        var amountInMax = tokenAmountInMax
            .shiftedBy(this._fromToken.decimals)
            .decimalPlaces(0);
        var amountOut = tokenAmountOut
            .shiftedBy(this._toToken.decimals)
            .decimalPlaces(0);
        switch (routeQuoteTradeContext.uniswapVersion) {
            case UniswapVersion.v2:
                return this._uniswapRouterContractFactoryV2.swapTokensForExactTokens(hexlify(amountOut), hexlify(amountInMax), routeQuoteTradeContext.routePathArray, this._ethereumAddress, deadline);
            case UniswapVersion.v3:
                return this.generateTradeDataForV3Output(amountOut, amountInMax, routeQuoteTradeContext.liquidityProviderFee, deadline);
            default:
                throw new UniswapError('Uniswap version not supported', ErrorCodes.uniswapVersionNotSupported);
        }
    };
    /**
     * Generate trade data for v3
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param liquidityProviderFee The liquidity provider fee
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataForV3Input = function (tokenAmount, tokenAmountMin, liquidityProviderFee, deadline) {
        var isNativeReceivingNativeEth = isNativeEth(this._toToken.contractAddress);
        var params = {
            tokenIn: removeEthFromContractAddress(this._fromToken.contractAddress),
            tokenOut: removeEthFromContractAddress(this._toToken.contractAddress),
            fee: percentToFeeAmount(liquidityProviderFee),
            recipient: isNativeReceivingNativeEth === true
                ? '0x0000000000000000000000000000000000000000'
                : this._ethereumAddress,
            deadline: deadline,
            amountIn: hexlify(tokenAmount),
            amountOutMinimum: hexlify(tokenAmountMin),
            sqrtPriceLimitX96: 0,
        };
        var multicallData = [];
        multicallData.push(this._uniswapRouterContractFactoryV3.exactInputSingle(params));
        if (isNativeEth(this._toToken.contractAddress)) {
            multicallData.push(this._uniswapRouterContractFactoryV3.unwrapWETH9(hexlify(tokenAmountMin), this._ethereumAddress));
        }
        return this._uniswapRouterContractFactoryV3.multicall(multicallData);
    };
    /**
     * Generate trade data for v3
     * @param tokenAmountInMax The amount in max
     * @param ethAmountOut The amount to receive
     * @param liquidityProviderFee The liquidity provider fee
     * @param deadline The deadline it expiries unix time
     */
    UniswapRouterFactory.prototype.generateTradeDataForV3Output = function (amountOut, amountInMaximum, liquidityProviderFee, deadline) {
        var isNativeReceivingNativeEth = isNativeEth(this._toToken.contractAddress);
        var params = {
            tokenIn: removeEthFromContractAddress(this._fromToken.contractAddress),
            tokenOut: removeEthFromContractAddress(this._toToken.contractAddress),
            fee: percentToFeeAmount(liquidityProviderFee),
            recipient: isNativeReceivingNativeEth === true
                ? '0x0000000000000000000000000000000000000000'
                : this._ethereumAddress,
            deadline: deadline,
            amountOut: hexlify(amountOut),
            amountInMaximum: hexlify(amountInMaximum),
            sqrtPriceLimitX96: 0,
        };
        var multicallData = [];
        multicallData.push(this._uniswapRouterContractFactoryV3.exactOutputSingle(params));
        if (isNativeEth(this._toToken.contractAddress)) {
            multicallData.push(this._uniswapRouterContractFactoryV3.unwrapWETH9(hexlify(amountOut), this._ethereumAddress));
        }
        return this._uniswapRouterContractFactoryV3.multicall(multicallData);
    };
    /**
     * Build up a transaction for erc20 from
     * @param data The data
     */
    UniswapRouterFactory.prototype.buildUpTransactionErc20 = function (uniswapVersion, data) {
        return {
            to: uniswapVersion === UniswapVersion.v2
                ? uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails)
                : uniswapContracts.v3.getRouterAddress(this._settings.cloneUniswapContractDetails),
            from: this._ethereumAddress,
            data: data,
            value: Constants.EMPTY_HEX_STRING,
        };
    };
    /**
     * Build up a transaction for eth from
     * @param ethValue The eth value
     * @param data The data
     */
    UniswapRouterFactory.prototype.buildUpTransactionEth = function (uniswapVersion, ethValue, data) {
        return {
            to: uniswapVersion === UniswapVersion.v2
                ? uniswapContracts.v2.getRouterAddress(this._settings.cloneUniswapContractDetails)
                : uniswapContracts.v3.getRouterAddress(this._settings.cloneUniswapContractDetails),
            from: this._ethereumAddress,
            data: data,
            value: toEthersBigNumber(parseEther(ethValue)).toHexString(),
        };
    };
    /**
     * Get the allowance and balance for the from and to token (will get balance for eth as well)
     */
    UniswapRouterFactory.prototype.getAllowanceAndBalanceForTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allowanceAndBalanceOfForTokens;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._tokensFactory.getAllowanceAndBalanceOfForContracts(this._ethereumAddress, [this._fromToken.contractAddress, this._toToken.contractAddress], false)];
                    case 1:
                        allowanceAndBalanceOfForTokens = _a.sent();
                        return [2 /*return*/, {
                                fromToken: allowanceAndBalanceOfForTokens.find(function (c) {
                                    return c.token.contractAddress.toLowerCase() ===
                                        _this._fromToken.contractAddress.toLowerCase();
                                }).allowanceAndBalanceOf,
                                toToken: allowanceAndBalanceOfForTokens.find(function (c) {
                                    return c.token.contractAddress.toLowerCase() ===
                                        _this._toToken.contractAddress.toLowerCase();
                                }).allowanceAndBalanceOf,
                            }];
                }
            });
        });
    };
    /**
     * Has got enough allowance to do the trade
     * @param amount The amount you want to swap
     */
    UniswapRouterFactory.prototype.hasGotEnoughAllowance = function (amount, allowance) {
        if (this.tradePath() === TradePath.ethToErc20) {
            return true;
        }
        var bigNumberAllowance = new BigNumber(allowance).shiftedBy(this._fromToken.decimals * -1);
        if (new BigNumber(amount).isGreaterThan(bigNumberAllowance)) {
            return false;
        }
        return true;
    };
    UniswapRouterFactory.prototype.hasEnoughAllowanceAndBalance = function (amountToTrade, bestRouteQuote, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var allowanceAndBalancesForTokens, enoughBalance, fromBalance, _a, result, result_1, result_2, enoughV2Allowance, enoughV3Allowance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAllowanceAndBalanceForTokens()];
                    case 1:
                        allowanceAndBalancesForTokens = _b.sent();
                        enoughBalance = false;
                        fromBalance = allowanceAndBalancesForTokens.fromToken.balanceOf;
                        _a = this.tradePath();
                        switch (_a) {
                            case TradePath.ethToErc20: return [3 /*break*/, 2];
                            case TradePath.erc20ToErc20: return [3 /*break*/, 4];
                            case TradePath.erc20ToEth: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.hasGotEnoughBalanceEth(direction === TradeDirection.input
                            ? amountToTrade.toFixed()
                            : bestRouteQuote.expectedConvertQuote)];
                    case 3:
                        result = _b.sent();
                        enoughBalance = result.hasEnough;
                        fromBalance = result.balance;
                        return [3 /*break*/, 5];
                    case 4:
                        if (direction == TradeDirection.input) {
                            result_1 = this.hasGotEnoughBalanceErc20(amountToTrade.toFixed(), allowanceAndBalancesForTokens.fromToken.balanceOf);
                            enoughBalance = result_1.hasEnough;
                            fromBalance = result_1.balance;
                        }
                        else {
                            result_2 = this.hasGotEnoughBalanceErc20(bestRouteQuote.expectedConvertQuote, allowanceAndBalancesForTokens.fromToken.balanceOf);
                            enoughBalance = result_2.hasEnough;
                            fromBalance = result_2.balance;
                        }
                        _b.label = 5;
                    case 5:
                        enoughV2Allowance = direction === TradeDirection.input
                            ? this.hasGotEnoughAllowance(amountToTrade.toFixed(), allowanceAndBalancesForTokens.fromToken.allowanceV2)
                            : this.hasGotEnoughAllowance(bestRouteQuote.expectedConvertQuote, allowanceAndBalancesForTokens.fromToken.allowanceV2);
                        enoughV3Allowance = direction === TradeDirection.input
                            ? this.hasGotEnoughAllowance(amountToTrade.toFixed(), allowanceAndBalancesForTokens.fromToken.allowanceV3)
                            : this.hasGotEnoughAllowance(bestRouteQuote.expectedConvertQuote, allowanceAndBalancesForTokens.fromToken.allowanceV3);
                        return [2 /*return*/, {
                                enoughV2Allowance: enoughV2Allowance,
                                enoughV3Allowance: enoughV3Allowance,
                                enoughBalance: enoughBalance,
                                fromBalance: fromBalance,
                                toBalance: allowanceAndBalancesForTokens.toToken.balanceOf,
                            }];
                }
            });
        });
    };
    /**
     * Has got enough balance to do the trade (eth check only)
     * @param amount The amount you want to swap
     */
    UniswapRouterFactory.prototype.hasGotEnoughBalanceEth = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getEthBalance()];
                    case 1:
                        balance = _a.sent();
                        if (new BigNumber(amount).isGreaterThan(balance)) {
                            return [2 /*return*/, {
                                    hasEnough: false,
                                    balance: balance.toFixed(),
                                }];
                        }
                        return [2 /*return*/, {
                                hasEnough: true,
                                balance: balance.toFixed(),
                            }];
                }
            });
        });
    };
    /**
     * Has got enough balance to do the trade (erc20 check only)
     * @param amount The amount you want to swap
     */
    UniswapRouterFactory.prototype.hasGotEnoughBalanceErc20 = function (amount, balance) {
        var bigNumberBalance = new BigNumber(balance).shiftedBy(this._fromToken.decimals * -1);
        if (new BigNumber(amount).isGreaterThan(bigNumberBalance)) {
            return {
                hasEnough: false,
                balance: bigNumberBalance.toFixed(),
            };
        }
        return {
            hasEnough: true,
            balance: bigNumberBalance.toFixed(),
        };
    };
    /**
     * Work out trade fiat cost
     * @param allRoutes All the routes
     * @param enoughAllowanceV2 Has got enough allowance for v2
     * @param enoughAllowanceV3 Has got enough allowance for v3
     */
    UniswapRouterFactory.prototype.filterWithTransactionFees = function (allRoutes, enoughAllowanceV2, enoughAllowanceV3) {
        return __awaiter(this, void 0, void 0, function () {
            var ethContract, fiatPrices, toUsdValue, ethUsdValue, bestRouteQuoteHops, gasPriceGwei, gasPrice, bestRoute_1, i, route, expectedConvertQuoteFiatPrice, txFee, _a, _b, expectedConvertQuoteMinusTxFees, routeIndex;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this._settings.gasSettings && !this._settings.disableMultihops)) return [3 /*break*/, 7];
                        ethContract = WETHContract.MAINNET().contractAddress;
                        return [4 /*yield*/, this._coinGecko.getCoinGeckoFiatPrices([
                                this._toToken.contractAddress,
                                ethContract,
                            ])];
                    case 1:
                        fiatPrices = _c.sent();
                        toUsdValue = fiatPrices[this._toToken.contractAddress];
                        ethUsdValue = fiatPrices[WETHContract.MAINNET().contractAddress];
                        if (!(toUsdValue && ethUsdValue)) return [3 /*break*/, 7];
                        bestRouteQuoteHops = this.getBestRouteQuotesHops(allRoutes, enoughAllowanceV2, enoughAllowanceV3);
                        return [4 /*yield*/, this._settings.gasSettings.getGasPrice()];
                    case 2:
                        gasPriceGwei = _c.sent();
                        gasPrice = new BigNumber(gasPriceGwei).times(1e9);
                        i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(i < bestRouteQuoteHops.length)) return [3 /*break*/, 6];
                        route = bestRouteQuoteHops[i];
                        expectedConvertQuoteFiatPrice = new BigNumber(route.expectedConvertQuote).times(toUsdValue);
                        _a = formatEther;
                        _b = BigNumber.bind;
                        return [4 /*yield*/, this._ethersProvider.provider.estimateGas(route.transaction)];
                    case 4:
                        txFee = _a.apply(void 0, [new (_b.apply(BigNumber, [void 0, (_c.sent()).toHexString()]))().times(gasPrice)]).times(ethUsdValue);
                        route.gasPriceEstimatedBy = gasPriceGwei;
                        expectedConvertQuoteMinusTxFees = expectedConvertQuoteFiatPrice.minus(txFee);
                        if (bestRoute_1) {
                            if (expectedConvertQuoteMinusTxFees.isGreaterThan(bestRoute_1.expectedConvertQuoteMinusTxFees)) {
                                bestRoute_1 = {
                                    routeQuote: bestRouteQuoteHops[i],
                                    expectedConvertQuoteMinusTxFees: expectedConvertQuoteMinusTxFees,
                                };
                            }
                        }
                        else {
                            bestRoute_1 = {
                                routeQuote: bestRouteQuoteHops[i],
                                expectedConvertQuoteMinusTxFees: expectedConvertQuoteMinusTxFees,
                            };
                        }
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (bestRoute_1) {
                            routeIndex = allRoutes.findIndex(function (r) {
                                return r.expectedConvertQuote ===
                                    bestRoute_1.routeQuote.expectedConvertQuote &&
                                    bestRoute_1.routeQuote.routeText === r.routeText;
                            });
                            allRoutes.splice(routeIndex, 1);
                            allRoutes.unshift(bestRoute_1.routeQuote);
                        }
                        _c.label = 7;
                    case 7: return [2 /*return*/, allRoutes];
                }
            });
        });
    };
    /**
     * Work out the best route quote hops aka the best direct, the best 3 hop and the best 4 hop
     * @param allRoutes All the routes
     * @param enoughAllowanceV2 Has got enough allowance for v2
     * @param enoughAllowanceV3 Has got enough allowance for v3
     */
    UniswapRouterFactory.prototype.getBestRouteQuotesHops = function (allRoutes, enoughAllowanceV2, enoughAllowanceV3) {
        var routes = [];
        for (var i = 0; i < allRoutes.length; i++) {
            if (routes.find(function (r) { return r.routePathArray.length === 2; }) &&
                routes.find(function (r) { return r.routePathArray.length === 3; }) &&
                routes.find(function (r) { return r.routePathArray.length === 4; })) {
                break;
            }
            var route = allRoutes[i];
            if (route.uniswapVersion === UniswapVersion.v2
                ? enoughAllowanceV2
                : enoughAllowanceV3) {
                if (route.routePathArray.length === 2 &&
                    !routes.find(function (r) { return r.routePathArray.length === 2; })) {
                    routes.push(route);
                    continue;
                }
                if (route.routePathArray.length === 3 &&
                    !routes.find(function (r) { return r.routePathArray.length === 3; })) {
                    routes.push(route);
                    continue;
                }
                if (route.routePathArray.length === 4 &&
                    !routes.find(function (r) { return r.routePathArray.length === 4; })) {
                    routes.push(route);
                    continue;
                }
            }
        }
        return routes;
    };
    // /**
    //  * Encode the route path for v3 ( WILL NEED WHEN WE SUPPORT V3 DOING NONE DIRECT ROUTES)
    //  * @param path The path
    //  * @param fees The fees
    //  */
    // public encodeRoutePathV3(path: string[], fees: FeeAmount[]): string {
    //   // to do move
    //   const FEE_SIZE = 3;
    //   if (path.length != fees.length + 1) {
    //     throw new Error('path/fee lengths do not match');
    //   }
    //   let encoded = '0x';
    //   for (let i = 0; i < fees.length; i++) {
    //     // 20 byte encoding of the address
    //     encoded += path[i].slice(2);
    //     // 3 byte encoding of the fee
    //     encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, '0');
    //   }
    //   // encode the final token
    //   encoded += path[path.length - 1].slice(2);
    //   return encoded.toLowerCase();
    // }
    /**
     * Works out every possible route it can take - v2 only
     * @param fromTokenRoutes The from token routes
     * @param toTokenRoutes The to token routes
     * @param allMainRoutes All the main routes
     */
    UniswapRouterFactory.prototype.workOutAllPossibleRoutes = function (fromTokenRoutes, toTokenRoutes, allMainRoutes) {
        var jointCompatibleRoutes = toTokenRoutes.pairs.toTokenPairs.filter(function (t) {
            return fromTokenRoutes.pairs.fromTokenPairs.find(function (f) {
                return f.contractAddress.toLowerCase() === t.contractAddress.toLowerCase();
            });
        });
        var routes = [];
        if (fromTokenRoutes.pairs.fromTokenPairs.find(function (t) {
            return t.contractAddress.toLowerCase() ===
                toTokenRoutes.token.contractAddress.toLowerCase();
        })) {
            routes.push({
                route: [fromTokenRoutes.token, toTokenRoutes.token],
                liquidityProviderFee: this.LIQUIDITY_PROVIDER_FEE_V2,
            });
        }
        var _loop_1 = function (i) {
            var tokenRoute = allMainRoutes[i];
            if (jointCompatibleRoutes.find(function (c) {
                return c.contractAddress.toLowerCase() ===
                    tokenRoute.token.contractAddress.toLowerCase();
            })) {
                routes.push({
                    route: [fromTokenRoutes.token, tokenRoute.token, toTokenRoutes.token],
                    liquidityProviderFee: this_1.LIQUIDITY_PROVIDER_FEE_V2,
                });
                var _loop_2 = function (f) {
                    var fromSupportedToken = fromTokenRoutes.pairs.fromTokenPairs[f];
                    if (tokenRoute.pairs.toTokenPairs.find(function (pair) {
                        return pair.contractAddress.toLowerCase() ===
                            fromSupportedToken.contractAddress.toLowerCase();
                    })) {
                        var workedOutFromRoute = [
                            fromTokenRoutes.token,
                            fromSupportedToken,
                            tokenRoute.token,
                            toTokenRoutes.token,
                        ];
                        if (workedOutFromRoute.filter(onlyUnique).length ===
                            workedOutFromRoute.length) {
                            routes.push({
                                route: workedOutFromRoute,
                                liquidityProviderFee: this_1.LIQUIDITY_PROVIDER_FEE_V2,
                            });
                        }
                    }
                };
                for (var f = 0; f < fromTokenRoutes.pairs.fromTokenPairs.length; f++) {
                    _loop_2(f);
                }
                var _loop_3 = function (f) {
                    var toSupportedToken = toTokenRoutes.pairs.toTokenPairs[f];
                    if (tokenRoute.pairs.fromTokenPairs.find(function (pair) {
                        return pair.contractAddress.toLowerCase() ===
                            toSupportedToken.contractAddress.toLowerCase();
                    })) {
                        var workedOutToRoute = [
                            fromTokenRoutes.token,
                            tokenRoute.token,
                            toSupportedToken,
                            toTokenRoutes.token,
                        ];
                        if (workedOutToRoute.filter(onlyUnique).length ===
                            workedOutToRoute.length) {
                            routes.push({
                                route: workedOutToRoute,
                                liquidityProviderFee: this_1.LIQUIDITY_PROVIDER_FEE_V2,
                            });
                        }
                    }
                };
                for (var f = 0; f < toTokenRoutes.pairs.toTokenPairs.length; f++) {
                    _loop_3(f);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < allMainRoutes.length; i++) {
            _loop_1(i);
        }
        return routes;
    };
    UniswapRouterFactory.prototype.getTokenAvailablePairs = function (token, allAvailablePairs, direction) {
        switch (direction) {
            case RouterDirection.from:
                return this.getFromRouterDirectionAvailablePairs(token, allAvailablePairs);
            case RouterDirection.to:
                return this.getToRouterDirectionAvailablePairs(token, allAvailablePairs);
        }
    };
    UniswapRouterFactory.prototype.getFromRouterDirectionAvailablePairs = function (token, allAvailablePairs) {
        var fromRouterDirection = allAvailablePairs.filter(function (c) { return c.reference.split('-')[0] === token.contractAddress; });
        var tokens = [];
        var _loop_4 = function (index) {
            var context = fromRouterDirection[index];
            tokens.push(this_2.allTokens.find(function (t) { return t.contractAddress === context.reference.split('-')[1]; }));
        };
        var this_2 = this;
        for (var index = 0; index < fromRouterDirection.length; index++) {
            _loop_4(index);
        }
        return tokens;
    };
    UniswapRouterFactory.prototype.getToRouterDirectionAvailablePairs = function (token, allAvailablePairs) {
        var toRouterDirection = allAvailablePairs.filter(function (c) { return c.reference.split('-')[1] === token.contractAddress; });
        var tokens = [];
        var _loop_5 = function (index) {
            var context = toRouterDirection[index];
            tokens.push(this_3.allTokens.find(function (t) { return t.contractAddress === context.reference.split('-')[0]; }));
        };
        var this_3 = this;
        for (var index = 0; index < toRouterDirection.length; index++) {
            _loop_5(index);
        }
        return tokens;
    };
    /**
     * Build up route quotes from results
     * @param contractCallResults The contract call results
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.buildRouteQuotesFromResults = function (amountToTrade, contractCallResults, direction) {
        var tradePath = this.tradePath();
        var result = [];
        for (var key in contractCallResults.results) {
            var contractCallReturnContext = contractCallResults.results[key];
            if (contractCallReturnContext) {
                for (var i = 0; i < contractCallReturnContext.callsReturnContext.length; i++) {
                    var callReturnContext = contractCallReturnContext.callsReturnContext[i];
                    // console.log(JSON.stringify(callReturnContext, null, 4));
                    if (!callReturnContext.success) {
                        continue;
                    }
                    switch (tradePath) {
                        case TradePath.ethToErc20:
                            result.push(this.buildRouteQuoteForEthToErc20(amountToTrade, callReturnContext, contractCallReturnContext.originalContractCallContext.context[i], direction, contractCallReturnContext.originalContractCallContext
                                .reference));
                            break;
                        case TradePath.erc20ToEth:
                            result.push(this.buildRouteQuoteForErc20ToEth(amountToTrade, callReturnContext, contractCallReturnContext.originalContractCallContext.context[i], direction, contractCallReturnContext.originalContractCallContext
                                .reference));
                            break;
                        case TradePath.erc20ToErc20:
                            result.push(this.buildRouteQuoteForErc20ToErc20(amountToTrade, callReturnContext, contractCallReturnContext.originalContractCallContext.context[i], direction, contractCallReturnContext.originalContractCallContext
                                .reference));
                            break;
                        default:
                            throw new UniswapError(tradePath + " not found", ErrorCodes.tradePathIsNotSupported);
                    }
                }
            }
        }
        if (direction === TradeDirection.input) {
            return result.sort(function (a, b) {
                if (new BigNumber(a.expectedConvertQuote).isGreaterThan(b.expectedConvertQuote)) {
                    return -1;
                }
                return new BigNumber(a.expectedConvertQuote).isLessThan(b.expectedConvertQuote)
                    ? 1
                    : 0;
            });
        }
        else {
            return result.sort(function (a, b) {
                if (new BigNumber(a.expectedConvertQuote).isLessThan(b.expectedConvertQuote)) {
                    return -1;
                }
                return new BigNumber(a.expectedConvertQuote).isGreaterThan(b.expectedConvertQuote)
                    ? 1
                    : 0;
            });
        }
    };
    /**
     * Build up the route quote for erc20 > eth (not shared with other method for safety reasons)
     * @param callReturnContext The call return context
     * @param routeContext The route context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.buildRouteQuoteForErc20ToErc20 = function (amountToTrade, callReturnContext, routeContext, direction, uniswapVersion) {
        var _this = this;
        var convertQuoteUnformatted = this.getConvertQuoteUnformatted(callReturnContext, direction, uniswapVersion);
        var expectedConvertQuote = direction === TradeDirection.input
            ? convertQuoteUnformatted
                .shiftedBy(this._toToken.decimals * -1)
                .toFixed(this._toToken.decimals)
            : convertQuoteUnformatted
                .shiftedBy(this._fromToken.decimals * -1)
                .toFixed(this._fromToken.decimals);
        var expectedConvertQuoteOrTokenAmountInMaxWithSlippage = this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction, uniswapVersion);
        var tradeExpires = this.generateTradeDeadlineUnixTime();
        var routeQuoteTradeContext = {
            uniswapVersion: uniswapVersion,
            liquidityProviderFee: routeContext.liquidityProviderFee,
            routePathArray: callReturnContext.methodParameters[1],
        };
        var data = direction === TradeDirection.input
            ? this.generateTradeDataErc20ToErc20Input(amountToTrade, new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), routeQuoteTradeContext, tradeExpires.toString(), true // TODO make it dynamic
            )
            : this.generateTradeDataErc20ToErc20Output(new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), amountToTrade, routeQuoteTradeContext, tradeExpires.toString());
        var transaction = this.buildUpTransactionErc20(uniswapVersion, data);
        switch (uniswapVersion) {
            case UniswapVersion.v2:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c) {
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; });
                    }),
                    routeText: callReturnContext.methodParameters[1]
                        .map(function (c) {
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; })
                            .symbol;
                    })
                        .join(' > '),
                    // route array is always in the 1 index of the method parameters
                    routePathArray: callReturnContext.methodParameters[1],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            case UniswapVersion.v3:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: [this._fromToken, this._toToken],
                    routeText: this._fromToken.symbol + " > " + this._toToken.symbol,
                    routePathArray: [
                        this._fromToken.contractAddress,
                        this._toToken.contractAddress,
                    ],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            default:
                throw new UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Build up the route quote for eth > erc20 (not shared with other method for safety reasons)
     * @param callReturnContext The call return context
     * @param routeContext The route context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.buildRouteQuoteForEthToErc20 = function (amountToTrade, callReturnContext, routeContext, direction, uniswapVersion) {
        var _this = this;
        var _a, _b, _c, _d;
        var convertQuoteUnformatted = this.getConvertQuoteUnformatted(callReturnContext, direction, uniswapVersion);
        var expectedConvertQuote = direction === TradeDirection.input
            ? convertQuoteUnformatted
                .shiftedBy(this._toToken.decimals * -1)
                .toFixed(this._toToken.decimals)
            : new BigNumber(formatEther(convertQuoteUnformatted)).toFixed(this._fromToken.decimals);
        var expectedConvertQuoteOrTokenAmountInMaxWithSlippage = this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction, uniswapVersion);
        var tradeExpires = this.generateTradeDeadlineUnixTime();
        var routeQuoteTradeContext = {
            uniswapVersion: uniswapVersion,
            liquidityProviderFee: routeContext.liquidityProviderFee,
            routePathArray: callReturnContext.methodParameters[1],
        };
        var data = direction === TradeDirection.input
            ? this.generateTradeDataEthToErc20Input(amountToTrade, new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), routeQuoteTradeContext, tradeExpires.toString())
            : this.generateTradeDataEthToErc20Output(new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), amountToTrade, routeQuoteTradeContext, tradeExpires.toString());
        var transaction = this.buildUpTransactionEth(uniswapVersion, direction === TradeDirection.input
            ? amountToTrade
            : new BigNumber(expectedConvertQuote), data);
        switch (uniswapVersion) {
            case UniswapVersion.v2:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c, index) {
                        var _a, _b;
                        var token = deepClone(_this.allTokens.find(function (t) { return t.contractAddress === c; }));
                        if (index === 0) {
                            return turnTokenIntoEthForResponse(token, (_b = (_a = _this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency);
                        }
                        return token;
                    }),
                    routeText: callReturnContext.methodParameters[1]
                        .map(function (c, index) {
                        if (index === 0) {
                            return _this.getNativeTokenSymbol();
                        }
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; })
                            .symbol;
                    })
                        .join(' > '),
                    // route array is always in the 1 index of the method parameters
                    routePathArray: callReturnContext.methodParameters[1],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            case UniswapVersion.v3:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: [
                        turnTokenIntoEthForResponse(this._fromToken, (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency),
                        this._toToken,
                    ],
                    routeText: turnTokenIntoEthForResponse(this._fromToken, (_d = (_c = this._settings) === null || _c === void 0 ? void 0 : _c.customNetwork) === null || _d === void 0 ? void 0 : _d.nativeCurrency).symbol + " > " + this._toToken.symbol,
                    routePathArray: [
                        this._fromToken.contractAddress,
                        this._toToken.contractAddress,
                    ],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            default:
                throw new UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Build up the route quote for erc20 > eth (not shared with other method for safety reasons)
     * @param callReturnContext The call return context
     * @param routeContext The route context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.buildRouteQuoteForErc20ToEth = function (amountToTrade, callReturnContext, routeContext, direction, uniswapVersion) {
        var _this = this;
        var _a, _b, _c, _d;
        var convertQuoteUnformatted = this.getConvertQuoteUnformatted(callReturnContext, direction, uniswapVersion);
        var expectedConvertQuote = direction === TradeDirection.input
            ? new BigNumber(formatEther(convertQuoteUnformatted)).toFixed(this._toToken.decimals)
            : convertQuoteUnformatted
                .shiftedBy(this._fromToken.decimals * -1)
                .toFixed(this._fromToken.decimals);
        var expectedConvertQuoteOrTokenAmountInMaxWithSlippage = this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction, uniswapVersion);
        var tradeExpires = this.generateTradeDeadlineUnixTime();
        var routeQuoteTradeContext = {
            uniswapVersion: uniswapVersion,
            liquidityProviderFee: routeContext.liquidityProviderFee,
            routePathArray: callReturnContext.methodParameters[1],
        };
        var data = direction === TradeDirection.input
            ? this.generateTradeDataErc20ToEthInput(amountToTrade, new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), routeQuoteTradeContext, tradeExpires.toString(), true //todo: make it dynamic
            )
            : this.generateTradeDataErc20ToEthOutput(new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage), amountToTrade, routeQuoteTradeContext, tradeExpires.toString());
        var transaction = this.buildUpTransactionErc20(uniswapVersion, data);
        switch (uniswapVersion) {
            case UniswapVersion.v2:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c, index) {
                        var _a, _b;
                        var token = deepClone(_this.allTokens.find(function (t) { return t.contractAddress === c; }));
                        if (index === callReturnContext.methodParameters[1].length - 1) {
                            return turnTokenIntoEthForResponse(token, (_b = (_a = _this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency);
                        }
                        return token;
                    }),
                    routeText: callReturnContext.methodParameters[1]
                        .map(function (c, index) {
                        if (index === callReturnContext.methodParameters[1].length - 1) {
                            return _this.getNativeTokenSymbol();
                        }
                        return _this.allTokens.find(function (t) { return t.contractAddress === c; })
                            .symbol;
                    })
                        .join(' > '),
                    // route array is always in the 1 index of the method parameters
                    routePathArray: callReturnContext.methodParameters[1],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            case UniswapVersion.v3:
                return {
                    expectedConvertQuote: expectedConvertQuote,
                    expectedConvertQuoteOrTokenAmountInMaxWithSlippage: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
                    transaction: transaction,
                    tradeExpires: tradeExpires,
                    routePathArrayTokenMap: [
                        this._fromToken,
                        turnTokenIntoEthForResponse(this._toToken, (_b = (_a = this._settings) === null || _a === void 0 ? void 0 : _a.customNetwork) === null || _b === void 0 ? void 0 : _b.nativeCurrency),
                    ],
                    routeText: this._fromToken.symbol + " > " + turnTokenIntoEthForResponse(this._toToken, (_d = (_c = this._settings) === null || _c === void 0 ? void 0 : _c.customNetwork) === null || _d === void 0 ? void 0 : _d.nativeCurrency).symbol,
                    routePathArray: [
                        this._fromToken.contractAddress,
                        this._toToken.contractAddress,
                    ],
                    uniswapVersion: uniswapVersion,
                    liquidityProviderFee: routeContext.liquidityProviderFee,
                    quoteDirection: direction,
                };
            default:
                throw new UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Get the convert quote unformatted from the call return context
     * @param callReturnContext The call return context
     * @param direction The direction you want to get the quote from
     * @param uniswapVersion The uniswap version
     */
    UniswapRouterFactory.prototype.getConvertQuoteUnformatted = function (callReturnContext, direction, uniswapVersion) {
        switch (uniswapVersion) {
            case UniswapVersion.v2:
                if (direction === TradeDirection.input) {
                    return new BigNumber(callReturnContext.returnValues[callReturnContext.returnValues.length - 1].hex);
                }
                else {
                    return new BigNumber(callReturnContext.returnValues[0].hex);
                }
            case UniswapVersion.v3:
                return new BigNumber(callReturnContext.returnValues[0].hex);
            default:
                throw new UniswapError('Invalid uniswap version', uniswapVersion);
        }
    };
    /**
     * Work out the expected convert quote taking off slippage
     * @param expectedConvertQuote The expected convert quote
     */
    UniswapRouterFactory.prototype.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage = function (expectedConvertQuote, tradeDirection, uniswapVersion) {
        var decimals = tradeDirection === TradeDirection.input
            ? this._toToken.decimals
            : this._fromToken.decimals;
        if (tradeDirection === TradeDirection.output &&
            uniswapVersion === UniswapVersion.v3) {
            return new BigNumber(expectedConvertQuote)
                .plus(new BigNumber(expectedConvertQuote)
                .times(this._settings.slippage)
                .toFixed(decimals))
                .toFixed(decimals);
        }
        return new BigNumber(expectedConvertQuote)
            .minus(new BigNumber(expectedConvertQuote)
            .times(this._settings.slippage)
            .toFixed(decimals))
            .toFixed(decimals);
    };
    /**
     * Format amount to trade into callable formats
     * @param amountToTrade The amount to trade
     * @param direction The direction you want to get the quote from
     */
    UniswapRouterFactory.prototype.formatAmountToTrade = function (amountToTrade, direction) {
        switch (this.tradePath()) {
            case TradePath.ethToErc20:
                if (direction == TradeDirection.input) {
                    var amountToTradeWei = parseEther(amountToTrade);
                    return hexlify(amountToTradeWei);
                }
                else {
                    return hexlify(amountToTrade.shiftedBy(this._toToken.decimals));
                }
            case TradePath.erc20ToEth:
                if (direction == TradeDirection.input) {
                    return hexlify(amountToTrade.shiftedBy(this._fromToken.decimals));
                }
                else {
                    var amountToTradeWei = parseEther(amountToTrade);
                    return hexlify(amountToTradeWei);
                }
            case TradePath.erc20ToErc20:
                if (direction == TradeDirection.input) {
                    return hexlify(amountToTrade.shiftedBy(this._fromToken.decimals));
                }
                else {
                    return hexlify(amountToTrade.shiftedBy(this._toToken.decimals));
                }
            default:
                throw new UniswapError("Internal trade path " + this.tradePath() + " is not supported", ErrorCodes.tradePathIsNotSupported);
        }
    };
    /**
     * Get the trade path
     */
    UniswapRouterFactory.prototype.tradePath = function () {
        var _a;
        var network = this._ethersProvider.network();
        return getTradePath(network.chainId, this._fromToken, this._toToken, (_a = this._settings.customNetwork) === null || _a === void 0 ? void 0 : _a.nativeWrappedTokenInfo);
    };
    Object.defineProperty(UniswapRouterFactory.prototype, "allTokens", {
        get: function () {
            return __spreadArrays([this._fromToken, this._toToken], this.allMainTokens);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "allMainTokens", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var tokens = [
                    this.USDTTokenForConnectedNetwork,
                    this.COMPTokenForConnectedNetwork,
                    this.USDCTokenForConnectedNetwork,
                    this.DAITokenForConnectedNetwork,
                    this.WETHTokenForConnectedNetwork,
                    this.WBTCTokenForConnectedNetwork,
                ];
                return tokens.filter(function (t) { return t !== undefined; });
            }
            return [this.WETHTokenForConnectedNetwork];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForFromToken", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs_1 = [
                    [this._fromToken, this.USDTTokenForConnectedNetwork],
                    [this._fromToken, this.COMPTokenForConnectedNetwork],
                    [this._fromToken, this.USDCTokenForConnectedNetwork],
                    [this._fromToken, this.DAITokenForConnectedNetwork],
                    [this._fromToken, this.WBTCTokenForConnectedNetwork],
                ];
                if (!isNativeEth(this._fromToken.contractAddress) &&
                    !isNativeEth(this._toToken.contractAddress)) {
                    pairs_1.push([this._fromToken, this.WETHTokenForConnectedNetwork]);
                }
                return this.filterUndefinedTokens(pairs_1).filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
            }
            var pairs = [[this._fromToken, this.WETHTokenForConnectedNetwork]];
            return pairs.filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForToToken", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs_2 = [
                    [this.USDTTokenForConnectedNetwork, this._toToken],
                    [this.COMPTokenForConnectedNetwork, this._toToken],
                    [this.USDCTokenForConnectedNetwork, this._toToken],
                    [this.DAITokenForConnectedNetwork, this._toToken],
                    [this.WBTCTokenForConnectedNetwork, this._toToken],
                ];
                if (!isNativeEth(this._toToken.contractAddress) &&
                    !isNativeEth(this._toToken.contractAddress)) {
                    pairs_2.push([this.WETHTokenForConnectedNetwork, this._toToken]);
                }
                return this.filterUndefinedTokens(pairs_2).filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
            }
            var pairs = [
                [this.WETHTokenForConnectedNetwork, this._toToken],
            ];
            return pairs.filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForUSDT", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.USDTTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.USDTTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.USDTTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                    [this.USDTTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                ];
                if (!isNativeEth(this._fromToken.contractAddress) &&
                    !isNativeEth(this._toToken.contractAddress)) {
                    pairs.push([
                        this.USDTTokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForCOMP", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.COMPTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.COMPTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.COMPTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                ];
                if (!isNativeEth(this._fromToken.contractAddress) &&
                    !isNativeEth(this._toToken.contractAddress)) {
                    pairs.push([
                        this.COMPTokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForDAI", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.DAITokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.DAITokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                    [this.DAITokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.DAITokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                ];
                if (!isNativeEth(this._fromToken.contractAddress) &&
                    !isNativeEth(this._toToken.contractAddress)) {
                    pairs.push([
                        this.DAITokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForUSDC", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var pairs = [
                    [this.USDCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.USDCTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.USDCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.USDCTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                ];
                if (!isNativeEth(this._fromToken.contractAddress) &&
                    !isNativeEth(this._toToken.contractAddress)) {
                    pairs.push([
                        this.USDCTokenForConnectedNetwork,
                        this.WETHTokenForConnectedNetwork,
                    ]);
                }
                return this.filterUndefinedTokens(pairs);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForWBTC", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var tokens = [
                    [this.WBTCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.WBTCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.WBTCTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                    [this.WBTCTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
                ];
                return this.filterUndefinedTokens(tokens);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "mainCurrenciesPairsForWETH", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
                this._settings.customNetwork) {
                var tokens = [
                    [this.WETHTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                    [this.WETHTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
                ];
                return this.filterUndefinedTokens(tokens);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    UniswapRouterFactory.prototype.filterUndefinedTokens = function (tokens) {
        return tokens.filter(function (t) { return t[0] !== undefined && t[1] !== undefined; });
    };
    Object.defineProperty(UniswapRouterFactory.prototype, "USDTTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.usdt;
            }
            return USDT.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "COMPTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.comp;
            }
            return COMP.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "DAITokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.dai;
            }
            return DAI.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "USDCTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.usdc;
            }
            return USDC.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "WETHTokenForConnectedNetwork", {
        get: function () {
            if (this._settings.customNetwork) {
                return this._settings.customNetwork.nativeWrappedTokenInfo;
            }
            return WETHContract.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniswapRouterFactory.prototype, "WBTCTokenForConnectedNetwork", {
        get: function () {
            var _a;
            if (this._settings.customNetwork) {
                return (_a = this._settings.customNetwork.baseTokens) === null || _a === void 0 ? void 0 : _a.wbtc;
            }
            return WBTC.token(this._ethersProvider.provider.network.chainId);
        },
        enumerable: false,
        configurable: true
    });
    UniswapRouterFactory.prototype.getNativeTokenSymbol = function () {
        if (this._settings.customNetwork) {
            return this._settings.customNetwork.nativeCurrency.symbol;
        }
        return ETH_SYMBOL;
    };
    return UniswapRouterFactory;
}());
export { UniswapRouterFactory };
