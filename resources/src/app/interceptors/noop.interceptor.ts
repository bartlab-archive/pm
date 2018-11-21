import {Injectable} from '@angular/core';
import {AppEvent, AppInterceptor} from '../interfaces/app';

@Injectable()
export class NoopInterceptor implements AppInterceptor {
    on(appEvent: AppEvent, next: null): void {
        console.log('NoopInterceptor');
        console.log(appEvent)
    }
}
