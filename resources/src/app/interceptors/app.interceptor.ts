import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppService} from '../services/app.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    public constructor(
        private appService: AppService
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                () => {
                },
                (error) => {
                    this.appService.onHttpError(error);
                })
        );
    }
}
