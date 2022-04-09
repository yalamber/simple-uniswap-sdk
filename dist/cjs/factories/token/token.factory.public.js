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
exports.TokenFactoryPublic = void 0;
var ethers_provider_1 = require("../../ethers-provider");
var token_factory_1 = require("./token.factory");
var TokenFactoryPublic = /** @class */ (function (_super) {
    __extends(TokenFactoryPublic, _super);
    function TokenFactoryPublic(tokenContractAddress, providerContext) {
        return _super.call(this, tokenContractAddress, new ethers_provider_1.EthersProvider(providerContext)) || this;
    }
    return TokenFactoryPublic;
}(token_factory_1.TokenFactory));
exports.TokenFactoryPublic = TokenFactoryPublic;
