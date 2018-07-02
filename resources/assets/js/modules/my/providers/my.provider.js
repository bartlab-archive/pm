import ProviderBase from 'base/provider.base';
import 'angular';
import MyService from "../services/my.service";

export default class MyProvider extends ProviderBase {

    static get $inject() {
        return ['$injector'];
    }

    get $get() {
        return MyService.inst({
            modules: this.modules,
            // settings: this.settings,
            // create: this.create
        });
    }

    $onInit($injector) {
        this.modules = [];
        // this.settings = [];
        // this.create = [];
    }

    registerModule(data) {
        this.modules.push(Object.assign({
            // project menu link - state name
            // todo: change to "state" ?
            // url: '',

            // project menu title
            // title: '',

            // module name
            // todo: remove, use "enabled" param
            // name: '',

            // enabled by default
            // todo: (true|false|module|callback)
            // enable: false,

            component: ''

            // url regexp for detect active menu item
            // alt: []
        }, data));

        return this;
    }

    // registerSettings(data) {
    //     this.settings.push(Object.assign({
    //         // url part
    //         // todo: change to "part" ?
    //         url: '',
    //
    //         // settings group name
    //         // todo: chage to "title"
    //         name: '',
    //
    //         // component for settings
    //         component: '',
    //
    //         // enabled by module name
    //         // todo: remove, use new enable param
    //         module: '',
    //
    //         // todo: new enable param
    //         // enable: {
    //         //     // true|false
    //         //     create: true,
    //         //     // true|false|module|callback
    //         //     edit: true,
    //         // }
    //     }, data));
    //
    //     return this;
    // }
}