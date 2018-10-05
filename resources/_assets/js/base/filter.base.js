import InjectableBase from "base/injectable.base";

export default class FilterBase extends InjectableBase {

    static getName() {
        return super.getName().replace('Filter', '');
    }

    $return() {
        return (...args) => this.$filter(...args);
    }

    $filter(input) {
        return input;
    }

}