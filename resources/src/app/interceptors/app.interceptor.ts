import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpParams,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppService} from '../services/app.service';
import {AppHttpUrlEncodingCodec} from '../common/http';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    public constructor(
        private appService: AppService
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(
                req.clone({
                    params: new HttpParams({
                        encoder: new AppHttpUrlEncodingCodec(),
                        fromString: req.params.toString()
                    })
                })
            )
            .pipe(
                tap(
                    () => {
                    },
                    (error) => {
                        this.appService.onHttpError(error);
                    })
            );
    }
}
