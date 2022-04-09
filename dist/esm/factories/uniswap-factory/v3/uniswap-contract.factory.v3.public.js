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
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';
import { UniswapContractFactoryV3 } from './uniswap-contract.factory.v3';
var UniswapContractFactoryV3Public = /** @class */ (function (_super) {
    __extends(UniswapContractFactoryV3Public, _super);
    function UniswapContractFactoryV3Public(providerContext, factoryAddress) {
        if (factoryAddress === void 0) { factoryAddress = UniswapContractContextV3.factoryAddress; }
        return _super.call(this, new EthersProvider(providerContext), factoryAddress) || this;
    }
    return UniswapContractFactoryV3Public;
}(UniswapContractFactoryV3));
export { UniswapContractFactoryV3Public };
