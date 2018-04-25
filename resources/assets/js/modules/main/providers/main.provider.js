import ProviderBase from 'base/provider.base';
import MainService from "../services/main.service";

export default class MainProvider extends ProviderBase {

    static get $inject() {
        return [];
    }

    get $get() {
        return MainService.inst({
            adminMenu: this.adminMenu,
            appMenu: this.appMenu,
            newItemMenu: this.newItemMenu
        });
    }

    $onInit($injector) {
        this.appMenu = [];
        this.newItemMenu = [];
        this.adminMenu = [];
    }

    registerAppMenu(data) {
        this.appMenu.push(Object.assign({
            // item url
            url: '',

            // item title
            name: '',

            // item icon
            icon: ''
        }, data));

        return this;
    }

    registerNewItemMenu(data) {
        this.newItemMenu.push(Object.assign({
            // menu item name
            name: '',

            // item link
            url: '',

            // item icon
            icon: '',

            // module name
            module: '',

            // depends on project, bool or url string
            single: true,

            // enabled by default
            enable: false
        }, data));

        return this;
    }

    registerAdminMenu(data) {
        this.adminMenu.push(Object.assign({
            // item url
            url: '',

            // item title
            name: '',

            // item icon
            icon: ''
        }, data));

        return this;
    }

}