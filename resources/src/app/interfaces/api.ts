export interface ErrorMap {
    [key: string]: string[];
}

export interface FormResponseError {
    errors: ErrorMap;
    message: string;
}

export interface ResponseError {
    message: string;
}

export enum RequestStatus {
    pending = 'pending',
    success = 'success',
    error = 'error',
}
