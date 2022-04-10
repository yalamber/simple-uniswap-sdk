"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMulticall = void 0;
var ethereum_multicall_1 = require("ethereum-multicall");
var CustomMulticall = /** @class */ (function (_super) {
    __extends(CustomMulticall, _super);
    function CustomMulticall(ethersProvider, multicallCustomContractAddress) {
        return _super.call(this, {
            ethersProvider: ethersProvider,
            tryAggregate: true,
            multicallCustomContractAddress: multicallCustomContractAddress,
        }) || this;
    }
    return CustomMulticall;
}(ethereum_multicall_1.Multicall));
exports.CustomMulticall = CustomMulticall;