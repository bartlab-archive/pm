import InjectableBase from 'base/injectable.base';

export default class DirectiveBase extends InjectableBase {

    // static get selector() {
    //     throw '[' + this.name + '] Directive must have selector';
    // }

    static getName() {
        return super.getName().replace('Directive', '');
    }

}