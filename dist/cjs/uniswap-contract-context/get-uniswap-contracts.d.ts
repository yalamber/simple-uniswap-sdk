import { CloneUniswapContractDetails } from '../factories/pair/models/clone-uniswap-contract-details';
export declare const uniswapContracts: {
    v2: {
        getRouterAddress: (cloneUniswapContractDetails: CloneUniswapContractDetails | undefined) => string;
        getFactoryAddress: (cloneUniswapContractDetails: CloneUniswapContractDetails | undefined) => string;
        getPairAddress: (cloneUniswapContractDetails: CloneUniswapContractDetails | undefined) => string;
    };
    v3: {
        getRouterAddress: (cloneUniswapContractDetails: CloneUniswapContractDetails | undefined) => string;
        getFactoryAddress: (cloneUniswapContractDetails: CloneUniswapContractDetails | undefined) => string;
        getQuoterAddress: (cloneUniswapContractDetails: CloneUniswapContractDetails | undefined) => string;
    };
};
