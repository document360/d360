import { BaseResponse } from "./base-response";

export class ApiResponse<T> extends BaseResponse {
    result: T;
}
