import ObjectBase from 'base/object.base';

export default class InjectableBase extends ObjectBase {

    /**
     * Constructor for .config() and .run()
     *
     * @returns {function(...[*]): Injectable}
     */
    static inst(locals) {
        const self = this;
        const providerFn = (...args) => {
            const obj = new self(...args);

            // apply locals property
            if (locals !== null && typeof locals === 'object') {
                Object.assign(obj, locals);
            }

            obj.$onInit();

            // allow rewrite finall object
            return obj.$return();
        };
        // const providerFn = (...args) => new self(...args);

        providerFn.$inject = self.$inject;
        return providerFn;
    }

    $return() {
        return this;
    }

    $onInit() {
    }

}