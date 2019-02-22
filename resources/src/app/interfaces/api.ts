export interface ErrorMap {
    [key: string]: string[];
}

export interface FormResponseError {
    errors: ErrorMap;
    message: string;
}

export interface ErrorData {
    errors: {
        [key: string]: string[];
    };
}

export interface ResponseError {
    message: string;
    error?: ErrorData;
}

export enum RequestStatus {
    pending = 'pending',
    success = 'success',
    error = 'error',
}

export interface ValidatorMessage {
    type: string;
    message: string;
}
