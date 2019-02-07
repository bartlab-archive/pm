import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppInterceptor, AppInterceptorHandler} from '../../../app/interfaces/app';
import {AppEventsUnion, AppPreloadEvent, EVENT_TYPE_PRELOAD} from '../../../app/events';
import {AddCategoryAction} from '../store/actions/shared.actions';
import {PreloadRequestAction} from '../store/actions/projects.actions';

@Injectable()
export class ProjectsEventInterceptor implements AppInterceptor {
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
        this.store.dispatch(new PreloadRequestAction());

        // todo: check for admin
        this.store.dispatch(new AddCategoryAction({
            name: 'Projects',
            icon: 'work',
            url: '/admin/projects',
        }));

        next.handle(appEvent);
    }
}
