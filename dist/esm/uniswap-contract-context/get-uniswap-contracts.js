import { UniswapContractContextV2 } from './uniswap-contract-context-v2';
import { UniswapContractContextV3 } from './uniswap-contract-context-v3';
export var uniswapContracts = {
    v2: {
        getRouterAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v2Override) {
                return cloneUniswapContractDetails.v2Override.routerAddress;
            }
            return UniswapContractContextV2.routerAddress;
        },
        getFactoryAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v2Override) {
                return cloneUniswapContractDetails.v2Override.factoryAddress;
            }
            return UniswapContractContextV2.factoryAddress;
        },
        getPairAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v2Override) {
                return cloneUniswapContractDetails.v2Override.pairAddress;
            }
            return UniswapContractContextV2.pairAddress;
        },
    },
    v3: {
        getRouterAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v3Override) {
                return cloneUniswapContractDetails.v3Override.routerAddress;
            }
            return UniswapContractContextV3.routerAddress;
        },
        getFactoryAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v3Override) {
                return cloneUniswapContractDetails.v3Override.factoryAddress;
            }
            return UniswapContractContextV3.factoryAddress;
        },
        getQuoterAddress: function (cloneUniswapContractDetails) {
            if (cloneUniswapContractDetails &&
                cloneUniswapContractDetails.v3Override) {
                return cloneUniswapContractDetails.v3Override.quoterAddress;
            }
            return UniswapContractContextV3.quoterAddress;
        },
    },
};
