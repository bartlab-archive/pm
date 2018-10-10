export interface ErrorMap {
    [key: string]: string[];
}

export interface FormResponseError {
    errors: ErrorMap;
    message: string;
}
