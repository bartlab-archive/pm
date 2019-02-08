import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public constructor(
        private authService: AuthService,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(
                this.authService.isAuthorized() ? req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${this.authService.getToken()}`,
                    },
                }) : req,
            )
            .pipe(
                catchError((error) => {
                    if (error.status === 401) {
                        this.authService.onUnauthorizedError(error);
                        return EMPTY;
                    }

                    if (error.status === 403) {
                        this.authService.onForbiddenError(error);
                        return EMPTY;
                    }

                    return throwError(error);
                }),
            );
    }
}
