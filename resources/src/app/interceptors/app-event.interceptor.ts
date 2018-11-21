import {Injectable} from '@angular/core';
import {AppEvent, AppInterceptor, AppInterceptorHandler} from '../interfaces/app';
import {AppService} from '../services/app.service';

@Injectable()
export class AppEventInterceptor implements AppInterceptor {
    public constructor(private appService: AppService) {
    }

    on(appEvent: AppEvent, next: AppInterceptorHandler) {
        console.log('AppEventInterceptor');
        next.handle(appEvent);
    }
}
