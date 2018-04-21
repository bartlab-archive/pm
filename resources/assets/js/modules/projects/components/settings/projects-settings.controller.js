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
        return ['projectsService', '$stateParams', '$rootScope', '$state'];
    }

    $onInit() {
        // settings tabs
        this.settingsTabs = this.projectsService.getSettings().map((e) => {
            e.componentTag = '<' + _.kebabCase(e.component) + ' params="$ctrl.data" />';

            // disable module, that need enabled state
            e.enable = !e.module;

            return e;
        });

        // active tab name
        this.page = this.$stateParams.page;

        this.load();
        this.$rootScope.$on('updateProjectInfo', () => this.load());
    }

    load() {
        // this.ProjectsService.all().get(this.$stateParams.project_id)
        this.projectsService.one(this.$stateParams.project_id)
            .then((response) => {
                this.model = response.data.data;
                this.data = response.data;

                this.settingsTabs.forEach((item) => {
                    item.enable = !item.module || response.data.modules.some(($m) => $m.name === item.module && $m.enabled === true);
                });
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