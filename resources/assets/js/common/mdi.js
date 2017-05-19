/**
 * Module Dependency Injector
 */
export default class MDI {
    constructor() {
        const injectProvider = (name) => {
            /**
             * skip public properties
             */
            if(name.indexOf('_') !== 0) return;

            const $injector = MDI.$injector;
            const providerName = name.substr(1);

            if ($injector && $injector.has(providerName)) {
                console.log('injectProvider:', providerName);
                this[name] = $injector.get(providerName);
                return this[name];
            }
        };

        return new Proxy(this, {
            get: (target, name) => {
                return name in target ? target[name] : injectProvider(name);
            }
        });
    }
}

MDI.$injector = null;