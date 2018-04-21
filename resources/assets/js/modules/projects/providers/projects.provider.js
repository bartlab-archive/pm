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
            settings: this.settings,
            create: this.create
        });
    }

    $onInit($injector) {
        this.modules = [];
        this.settings = [];
        this.create = [];
    }

    registerModule(data) {
        this.modules.push(Object.assign({
            // project menu link - state name
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
            // url part
            url: '',

            // settings group name
            name: '',

            // component for settings
            component: '',

            // enabled by module name
            module: ''
        }, data));

        return this;
    }
}