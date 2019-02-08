import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
    AuthData,
    LoginData,
    LoginResponse,
    User,
    RegisterData,
    RegisterResponse,
    ResultMessage,
    ResetData,
    ResetResponseData,
    MeResponse,
} from '../interfaces/auth';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '../store/reducers';
import * as fromRegister from '../store/reducers';
import * as fromReset from '../store/reducers';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public unauthorized$: Subject<any> = new Subject<any>();
    public forbidden$: Subject<any> = new Subject<any>();
    private data: AuthData = null;
    private messages: string[] = [];

    public constructor(private http: HttpClient, private store: Store<any>) {
        this.store.pipe(select(fromRegister.selectRegisterData)).subscribe((data: AuthData) => {
            this.data = data;
        });
        this.store.pipe(select(fromAuth.selectAuthData)).subscribe((data: AuthData) => {
            this.data = data;
        });
        this.store.pipe(select(fromRegister.selectRegisterMessage)).subscribe((data: string) => {
            this.addMessage(data);
        });
        this.store.pipe(select(fromReset.selectResetMessage)).subscribe((data: string) => {
            this.addMessage(data);
        });
    }

    public onUnauthorizedError(event) {
        this.unauthorized$.next(event);
    }

    public onForbiddenError(event) {
        this.forbidden$.next(event);
    }

    public login(data: LoginData): Observable<AuthData> {
        // console.log('data',data);
        return this.http.post<LoginResponse>('/api/v1/auth/login', data).pipe(
            map((response: LoginResponse) => {
                const { user, value: token } = response.data;

                return {
                    token,
                    user,
                };
            }),
        );
    }

    public register(rData: RegisterData): Observable<ResultMessage | LoginResponse> {
        return this.http.post<RegisterResponse>('/api/v1/auth/register', rData).pipe(
            map((response: RegisterResponse) => {
                const { message, data } = response;
                let auth = {};
                if (data) {
                    const { user, value: token } = data;
                    auth = { token, user };
                }

                return {
                    message,
                    auth: auth,
                };
            }),
        );
    }

    public reset(data: ResetData): Observable<ResetResponseData> {
        return this.http.post<ResetResponseData>('/api/v1/auth/reset', data).pipe(
            map((response: ResetResponseData) => {
                return response;
            }),
        );
    }

    public me(): Observable<MeResponse> {
        return this.http.get<MeResponse>('/api/v1/auth');
    }

    public isAuthorized(): boolean {
        return Boolean(this.data);
    }

    public isAdmin(): boolean {
        return Boolean(this.data.user.request);
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

    private addMessage(message: string): void {
        this.messages.push(message);
    }

    public getLastMessage() {
        return this.messages[this.messages.length - 1];
    }
}
