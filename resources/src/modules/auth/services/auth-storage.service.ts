import {Injectable} from '@angular/core';
import {AuthSelectService} from './auth-select.service';
import {AuthData, User} from '../interfaces/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthStorageService {
    private data: AuthData = null;

    public constructor(
        private authSelectService: AuthSelectService,
    ) {
        this.authSelectService.data$.subscribe(data => this.data = data);
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
