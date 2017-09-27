export default class ObjectBase {

    static get $inject() {
        return [];
    }

    constructor(...args) {
        const self = this.constructor;

        args.forEach((arg, index) => {
            if (index < self.$inject.length) {
                this[self.$inject[index]] = arg;
            }
        });
    }

}