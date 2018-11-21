import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormResponseError } from '../interfaces/api';

@Injectable()
export class FormService {
    public getFormResponseError(response: HttpErrorResponse): FormResponseError {
        const { error } = response;
        const { message, errors = {} } = error;
        if (response.status === 422) {
            return { errors, message };
        }

        return {
            message,
            errors: {},
        };
    }
}
