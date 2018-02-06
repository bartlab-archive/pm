import ProviderBase from 'base/provider.base';
import ProjectsService from "../services/projects.service";
import 'angular';

export default class ProjectsProvider extends ProviderBase {

    static get $inject() {
        return ['$injector'];
    }

    get $get() {
        return ProjectsService.inst({
            modules: this.modules,
            settings: this.settings
        });
    }

    $onInit($injector) {
        this.modules = [];
        this.settings = [];
    }

    registerModule(data) {
        this.modules.push(Object.assign({
            // project menu link
            url: '',

            // project menu title
            title: '',

            // module name
            name: '',

            // enabled by default
            enable: false,

            // url regexp for detect active menu item
            alt: []
        }, data));

        return this;
    }

    registerSettings(data) {
        this.settings.push(Object.assign({
            url: '',
            name: '',
            component: '',
            module: ''
        }, data));

        return this;
    }


}