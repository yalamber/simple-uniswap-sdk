var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EthersProvider, } from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapPairContractFactoryV2 } from './uniswap-pair-contract.factory.v2';
var UniswapPairContractFactoryPublicV2 = /** @class */ (function (_super) {
    __extends(UniswapPairContractFactoryPublicV2, _super);
    function UniswapPairContractFactoryPublicV2(providerContext, pairAddress) {
        if (pairAddress === void 0) { pairAddress = UniswapContractContextV2.pairAddress; }
        return _super.call(this, new EthersProvider(providerContext), pairAddress) || this;
    }
    return UniswapPairContractFactoryPublicV2;
}(UniswapPairContractFactoryV2));
export { UniswapPairContractFactoryPublicV2 };
