import { ErrorCodes } from '../../../common/errors/error-codes';
import { UniswapError } from '../../../common/errors/uniswap-error';
import { UniswapVersion } from '../../../enums/uniswap-version';
var UniswapPairSettings = /** @class */ (function () {
    function UniswapPairSettings(settings) {
        this.uniswapVersions = [UniswapVersion.v2, UniswapVersion.v3];
        this.gasSettings = undefined;
        this.cloneUniswapContractDetails = undefined;
        this.customNetwork = undefined;
        this.slippage = (settings === null || settings === void 0 ? void 0 : settings.slippage) || 0.005;
        this.deadlineMinutes = (settings === null || settings === void 0 ? void 0 : settings.deadlineMinutes) || 20;
        this.disableMultihops = (settings === null || settings === void 0 ? void 0 : settings.disableMultihops) || false;
        this.gasSettings = settings === null || settings === void 0 ? void 0 : settings.gasSettings;
        this.cloneUniswapContractDetails = settings === null || settings === void 0 ? void 0 : settings.cloneUniswapContractDetails;
        this.customNetwork = settings === null || settings === void 0 ? void 0 : settings.customNetwork;
        if (Array.isArray(settings === null || settings === void 0 ? void 0 : settings.uniswapVersions) &&
            (settings === null || settings === void 0 ? void 0 : settings.uniswapVersions.length) === 0) {
            throw new UniswapError('`uniswapVersions` must not be an empty array', ErrorCodes.uniswapVersionsMustNotBeAnEmptyArray);
        }
        if (settings &&
            Array.isArray(settings.uniswapVersions) &&
            settings.uniswapVersions.length > 0) {
            if (settings.uniswapVersions.find(function (u) { return u !== UniswapVersion.v2 && u !== UniswapVersion.v3; })) {
                throw new UniswapError('`uniswapVersions` only accepts v2 or v3', ErrorCodes.uniswapVersionsUnsupported);
            }
            this.uniswapVersions = settings === null || settings === void 0 ? void 0 : settings.uniswapVersions;
        }
    }
    return UniswapPairSettings;
}());
export { UniswapPairSettings };
