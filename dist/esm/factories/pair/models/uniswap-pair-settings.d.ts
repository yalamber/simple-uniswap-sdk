import { UniswapVersion } from '../../../enums/uniswap-version';
import { CloneUniswapContractDetails } from './clone-uniswap-contract-details';
import { CustomNetwork } from './custom-network';
import { GasSettings } from './gas-settings';
export declare class UniswapPairSettings {
    slippage: number;
    deadlineMinutes: number;
    disableMultihops: boolean;
    uniswapVersions: UniswapVersion[];
    gasSettings?: GasSettings;
    cloneUniswapContractDetails?: CloneUniswapContractDetails;
    customNetwork?: CustomNetwork;
    constructor(settings?: {
        slippage?: number | undefined;
        deadlineMinutes?: number | undefined;
        disableMultihops?: boolean | undefined;
        uniswapVersions?: UniswapVersion[] | undefined;
        gasSettings?: GasSettings | undefined;
        cloneUniswapContractDetails?: CloneUniswapContractDetails | undefined;
        customNetwork?: CustomNetwork | undefined;
    });
}
