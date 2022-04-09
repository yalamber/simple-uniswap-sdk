import { ethers } from 'ethers';
import { appendEthToContractAddress, isNativeEth, removeEthFromContractAddress, } from '../tokens/eth';
export function getAddress(address, keepEthPrefix) {
    if (keepEthPrefix === void 0) { keepEthPrefix = false; }
    var parsedAddress = ethers.utils.getAddress(removeEthFromContractAddress(address));
    if (!keepEthPrefix) {
        return parsedAddress;
    }
    if (!isNativeEth(address)) {
        return parsedAddress;
    }
    return appendEthToContractAddress(parsedAddress);
}
