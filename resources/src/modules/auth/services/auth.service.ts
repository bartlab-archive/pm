import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthData, LoginData, LoginResponse} from '../interfaces/auth';
import {FormResponseError} from "../../main/interfaces/api";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public constructor(
        private http: HttpClient,
    ) {
    }

    public login(data: LoginData): Observable<AuthData> {
        return this.http.post<LoginResponse>('/api/v1/auth/login', data)
            .pipe(
                map((response: LoginResponse) => {
                    const {
                        user,
                        value: token,
                    } = response.data;

                    return {
                        token,
                        user,
                    };
                }),
            );
    }

    public getFormResponseError(response: HttpErrorResponse): FormResponseError {
        const {error} = response;
        const {errors, message} = error;
        if (response.status === 422) {
            return {errors, message};
        }

        return {
            message,
            errors: null,
        };
    }
}
