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
var UniswapError = /** @class */ (function (_super) {
    __extends(UniswapError, _super);
    function UniswapError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.name = 'UniswapError';
        _this.message = message;
        _this.code = code;
        return _this;
    }
    return UniswapError;
}(Error));
export { UniswapError };
