import InjectableBase from "base/injectable.base";

/**
 * @property {array} appMenu
 * @property {array} newItemMenu
 * @property {array} adminMenu
 */
export default class MainService extends InjectableBase {

    static get $inject() {
        return [];
    }

    $onInit() {
    }

    getAppMenu() {
        return this.appMenu;
    }

    getNewItemMenu() {
        return this.newItemMenu;
    }

    getAdminMenu() {
        return this.adminMenu;
    }
}