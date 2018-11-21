import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppInterceptorHandler } from '../../interfaces/app';
import { APP_EVENT_ACTIONS, APP_EVENT_INTERCEPTORS } from '../../providers/app.injection';
import { NoopInterceptor } from '../../interceptors/noop.interceptor';
import { AppPreloadEvent } from '../../events';

@Injectable()
export class AppEffects {
    private interceptors: Array<any>;
    private actions: Array<any>;
    private chain: AppInterceptorHandler = null;
    private chainActions: Array<string> = null;

    @Effect({
        dispatch: false,
    })
    protected preload$ = this.actions$.pipe(
        ofType(...this.getChainActions()),
        tap(console.log),
        tap(() => this.getChain().handle(new AppPreloadEvent())),
    );

    public constructor(protected actions$: Actions, protected injector: Injector) {}

    public getChainActions(): string[] {
        if (this.chainActions !== null) {
            return this.chainActions;
        }

        this.actions = this.injector.get(APP_EVENT_ACTIONS);
        this.chainActions = this.actions.reduce((acc, val) => acc.concat(val), []);
        return this.chainActions;
    }

    public getChain() {
        if (this.chain !== null) {
            return this.chain;
        }

        this.interceptors = this.injector.get(APP_EVENT_INTERCEPTORS);
        this.chain = this.interceptors.reduceRight(
            (next, interceptor) => new AppInterceptorHandler(next, interceptor),
            new AppInterceptorHandler(null, new NoopInterceptor()),
        );

        return this.chain;
    }
}
