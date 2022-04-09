import { DFORCE } from './dForce';
import { MAI } from './mkr';
var _tokenOverrideInfo = [DFORCE.MAINNET(), MAI.MAINNET()];
export var isTokenOverrideInfo = function (contractAddress) {
    return _tokenOverrideInfo.find(function (info) {
        return info.contractAddress.toLowerCase() === contractAddress.toLowerCase();
    });
};
