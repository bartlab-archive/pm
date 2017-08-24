import ObjectBase from 'base/object.base';

export default class ServiceBase extends ObjectBase {

    constructor(...args) {
        super(...args);

        this.$onInit();
    }

    $onInit() {
    }
}