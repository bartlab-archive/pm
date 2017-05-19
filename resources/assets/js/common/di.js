export default class DI {

    static get $inject() {
        return [];
    }

    constructor() {
        (this.constructor.$inject || []).forEach((item, index) => {
            this[item] = arguments[index];
        });

        return this.init();
    }

    init() {

    }

    static getDI() {
        return [].concat(this.$inject || [], [(...args) => new this(...args)]);
    }
}