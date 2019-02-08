import { AppEvent } from '../interfaces/app';

export const EVENT_TYPE_PRELOAD = 'PRELOAD';

export class AppPreloadEvent implements AppEvent {
    public type = EVENT_TYPE_PRELOAD;
}

export type AppEventsUnion = AppPreloadEvent;
