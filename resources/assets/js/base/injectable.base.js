import ObjectBase from 'base/object.base';

export default class InjectableBase extends ObjectBase {

    /**
     * Constructor for .config() and .run()
     *
     * @returns {function(...[*]): Injectable}
     */
    static inst() {
        const self = this;
        const providerFn = (...args) => new self(...args);

        providerFn.$inject = self.$inject;
        return providerFn;
    }

    constructor(...args) {
        super(...args);

        this.$onInit();
    }

    $onInit() {
    }
}