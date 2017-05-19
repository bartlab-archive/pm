/**
 * Module Dependency Injector
 */
class MDI {
    proxyGetter(target, name) {
        return name in target ? target[name] : undefined;
    }

    constructor() {
        return new Proxy(this, {
            get: (target, name) => this.proxyGetter(target, name)
        });

        // return this.init();
    }
}


export default class MDII extends MDI {

    injectProvider(name) {
        /**
         * skip public properties
         */
        if (name.indexOf('_') !== 0) return;

        const $injector = MDII.$injector;
        const providerName = name.substr(1);

        if ($injector && $injector.has(providerName)) {
            console.log('injectProvider:', providerName);
            this[name] = $injector.get(providerName);
            return this[name];
        }
    }

    proxyGetter(target, name) {
        return name in target ? target[name] : this.injectProvider(name);
    }

    constructor() {
        super();
        return this.init();
    }
}

MDII.$injector = null;