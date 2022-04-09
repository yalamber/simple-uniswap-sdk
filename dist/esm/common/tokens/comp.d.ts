import { ChainId } from '../../enums/chain-id';
import { Token } from '../../factories/token/models/token';
/**
 * COMP token context CHANGE CONTRACT ADDRESS INFO ETC
 */
export declare class COMP {
    static MAINNET(): Token;
    /**
     * Get COMP token info by chain id
     * @param chainId The chain id
     */
    static token(chainId: ChainId | number): Token;
}
