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
import { UniswapContractFactoryV2 } from './uniswap-contract.factory.v2';
var UniswapContractFactoryV2Public = /** @class */ (function (_super) {
    __extends(UniswapContractFactoryV2Public, _super);
    function UniswapContractFactoryV2Public(providerContext, factoryAddress) {
        if (factoryAddress === void 0) { factoryAddress = UniswapContractContextV2.factoryAddress; }
        return _super.call(this, new EthersProvider(providerContext), factoryAddress) || this;
    }
    return UniswapContractFactoryV2Public;
}(UniswapContractFactoryV2));
export { UniswapContractFactoryV2Public };
