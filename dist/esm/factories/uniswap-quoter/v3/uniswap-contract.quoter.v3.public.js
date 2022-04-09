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
import { UniswapContractQuoterV3 } from './uniswap-contract.quoter.v3';
var UniswapContractQuoterV3Public = /** @class */ (function (_super) {
    __extends(UniswapContractQuoterV3Public, _super);
    function UniswapContractQuoterV3Public(providerContext, quoterAddress) {
        if (quoterAddress === void 0) { quoterAddress = UniswapContractContextV3.quoterAddress; }
        return _super.call(this, new EthersProvider(providerContext), quoterAddress) || this;
    }
    return UniswapContractQuoterV3Public;
}(UniswapContractQuoterV3));
export { UniswapContractQuoterV3Public };
