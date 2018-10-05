import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthStorageService} from '../services/auth-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authStorageService: AuthStorageService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authStorageService.isAuthorized()) {
            const headers = req.headers.append('Authorization', `Bearer ${this.authStorageService.getToken()}`);
            return next.handle(req.clone({headers}));
        }

        return next.handle(req);
    }
}
