import { ErrorCodes } from '../..';
export declare class UniswapError extends Error {
    name: string;
    code: ErrorCodes;
    message: string;
    constructor(message: string, code: ErrorCodes);
}
