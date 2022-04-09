export declare enum FeeAmount {
    LOW = 500,
    MEDIUM = 3000,
    HIGH = 10000
}
export declare const feeToPercent: (feeAmount: FeeAmount) => 0.0005 | 0.003 | 0.01;
export declare const percentToFeeAmount: (percent: number) => FeeAmount;
