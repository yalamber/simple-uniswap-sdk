import { ChainId } from '../../enums/chain-id';
import { Token } from '../../factories/token/models/token';
/**
 * USDT token context CHANGE CONTRACT ADDRESS INFO ETC
 */
export declare class USDT {
    static MAINNET(): Token;
    /**
     * Get USDT token info by chain id
     * @param chainId The chain id
     */
    static token(chainId: ChainId | number): Token;
}
