export class BaseResponse {
    success: boolean;
    information: unknown[];
    errors: ResponseError[];
    warnings: unknown[];
}

export interface ResponseError {
    description: string;
    errorCode: string;
    extensionData: string;
    stackTrace: string;
}