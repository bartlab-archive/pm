import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {$state} $state
 */
export default class ProjectsSettingsController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$stateParams', '$rootScope', '$state', '$scope'];
    }

    $onInit() {
        // settings tabs
        this.settingsTabs = this.projectsService.getSettings().map((e) => {
            e.componentTag = '<' + _.kebabCase(e.component) + ' params="$ctrl.model" />';
            // disable module, that need enabled state
            e.enable = !e.module;

            return e;
        });

        // active tab name
        this.page = this.$stateParams.page;
        this.model = {
            modules: []
        };
        this.load();
        this.updateProjectInfo = this.$rootScope.$on('updateProjectInfo', () => this.load());
    }

    $onDestroy() {
        this.updateProjectInfo();
    }

    load() {
        this.loadProccess = true;
        this.projectsService
            .one(this.projectsService.getCurrentId())
            .then((response) => {
                Object.assign(this.model, response.data.data);

                this.settingsTabs.forEach((item) => {
                    item.enable = !item.module || this.model.modules.some(($m) => $m.name === item.module);
                });

                this.loadProccess = false;
            });
    }

    selectTab(page) {
        this.$state.go(
            '.',
            {page: page},
            {
                // prevent the events onStart and onSuccess from firing
                notify: false,
                // prevent reload of the current state
                reload: false,
                // replace the last record when changing the params so you don't hit the back button and get old params
                location: 'replace',
                // inherit the current params on the url
                inherit: true
            }
        )
    }

}