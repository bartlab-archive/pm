export default class Injectable {

    static get $inject() {
        return [];
    }

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
        const self = this.constructor;

        args.forEach((arg, index) => {
            if (index < self.$inject.length) {
                this[self.$inject[index]] = arg;
            }
        });

        return this.$onInit();
    }

    $onInit() {
    }
}