export default class ObjectBase {

    static get $inject() {
        return [];
    }

    // static getName(){
    //     const self = this;
    //     return self.name;
    // }

    static getName() {
        return this.name[0].toLowerCase() + this.name.slice(1);
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