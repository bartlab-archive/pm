import {Injectable, Injector} from '@angular/core';
import {Store} from '@ngrx/store';
import {APP_MODULES_SELECTORS} from '../providers/app.injection';

const dummy = () => undefined;

@Injectable({
    providedIn: 'root',
})
export class AppSelectService {
    public selectors;

    public constructor(
        private injector: Injector,
        private store: Store<any>,
    ) {
        this.selectors = this.normalizeSelectors(this.injector.get(APP_MODULES_SELECTORS));
    }

    public normalizeSelectors(selectors) {
        return selectors.reduce((acc, selector) => {
            return Object.keys(selector).reduce((acc, key) => {
                acc[key] = selector[key];
                return acc;
            }, acc);
        }, {});
    }

    public getSelectors(modules, dummySelector = dummy) {
        return modules.map((module) => {
            const [name, state, key] = module.split('.');
            if (this.selectors[name] && this.selectors[name][state] && this.selectors[name][state][key]) {
                return this.selectors[name][state][key];
            }

            return dummySelector;
        });
    }

    public getMapEntitiesToObject(modules) {
        const states = modules.map((module) => {
            const [name, state] = module.split('.');
            return state;
        });

        return (...args) => {
            return states.reduce((acc, state, index) => {
                acc[state] = args[index];
                return acc;
            }, {});
        };
    }
}
