import { ethers } from 'ethers';
import { removeEthFromContractAddress } from '../tokens/eth';
export function isAddress(address) {
    return ethers.utils.isAddress(removeEthFromContractAddress(address));
}
