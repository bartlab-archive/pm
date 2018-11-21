export interface AppEvent {
    type: string;
    // isAuthorized?: boolean;
}

export interface AppInterceptor {
    on(appEvent: AppEvent, next: AppInterceptorHandler): void;
}

export class AppInterceptorHandler {
    constructor(
        private next: AppInterceptorHandler,
        private interceptor: AppInterceptor
    ) {
    }

    public handle(appEvent: AppEvent): void {
        this.interceptor.on(appEvent, this.next);
    }
}
