import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {
    AuthData,
    LoginData,
    LoginResponse,
    User,
    RegisterData,
    RegisterResponse,
    RegisterResult
} from '../interfaces/auth';
import {map} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../store/reducers';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public unauthorized$: Subject<any> = new Subject<any>();
    public forbidden$: Subject<any> = new Subject<any>();
    private data: AuthData = null;

    public constructor(
        private http: HttpClient,
        private store: Store<any>,
    ) {
        this.store.pipe(select(fromAuth.selectAuthData)).subscribe((data) => {
            this.data = data;
        });
    }

    public onUnauthorizedError(event) {
        this.unauthorized$.next(event);
    }

    public onForbiddenError(event) {
        this.forbidden$.next(event);
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

    public register(data: RegisterData): Observable<RegisterResult> {
        return this.http.post<RegisterResponse>('/api/v1/auth/register', data)
            .pipe(
                map((response: RegisterResponse) => {
                    const {
                        message,
                        user,
                        value: token,
                    } = response.data;

                    return {
                        message,
                        auth: {
                            token,
                            user,
                        }
                    };
                }),
            );
    }

    public isAuthorized(): boolean {
        return Boolean(this.data);
    }

    public getToken(): string {
        if (this.data) {
            return this.data.token;
        }

        return null;
    }

    public getUser(): User {
        if (this.data) {
            return this.data.user;
        }

        return null;
    }
}
