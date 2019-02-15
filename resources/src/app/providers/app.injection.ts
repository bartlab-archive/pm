import {InjectionToken} from '@angular/core';

export const APP_EVENT_INTERCEPTORS = new InjectionToken<Array<any>>(
    'APP_EVENT_INTERCEPTORS',
);

export const APP_EVENT_PRELOAD = new InjectionToken<Array<any>>(
    'APP_EVENT_PRELOAD',
);

export const APP_MODULE_META = new InjectionToken<Array<any>>('APP_MODULE_META');
export const APP_MODULE_SUBROUTES = new InjectionToken<Array<any>>(
    'APP_MODULE_SUBROUTES',
);
