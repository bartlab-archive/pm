import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppInterceptor, AppInterceptorHandler} from '../../../app/interfaces/app';
import {WikiPreloadRequestAction} from '../store/actions/wiki.action';
import {AppEventsUnion, AppPreloadEvent, EVENT_TYPE_PRELOAD} from '../../../app/events';

@Injectable()
export class WikiEventInterceptor implements AppInterceptor {
    public constructor(private store: Store<any>) {
    }

    public on(appEvent: AppEventsUnion, next: AppInterceptorHandler): void {
        switch (appEvent.type) {
            case EVENT_TYPE_PRELOAD: {
                return this.onPreload(appEvent, next);
            }

            default: {
                return next.handle(appEvent);
            }
        }
    }

    public onPreload(appEvent: AppPreloadEvent, next: AppInterceptorHandler): void {
        this.store.dispatch(new WikiPreloadRequestAction());

        next.handle(appEvent);
    }
}
