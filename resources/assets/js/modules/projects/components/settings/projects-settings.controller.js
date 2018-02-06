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
        return ['ProjectsService', '$stateParams', '$rootScope','$state'];
    }

    $onInit() {
        // settings tabs
        this.settingsTabs = this.ProjectsService.getSettings().map((e)=>{
            e.componentTag = '<' + _.kebabCase(e.component) + ' project="$ctrl.model" />';
            return e;
        });

        // active tab name
        this.page = this.$stateParams.page;

        this.load();
        this.$rootScope.$on('updateProjectInfo', () => this.load());
    }

    load() {
        // this.ProjectsService.one(this.$stateParams.project_id).then((response) => {
        //     this.model = _.get(response, 'data', []);
        //     this.model.modules = this.ProjectsService.getModules(this.model.enabled_modules);
        //     this.tabs = Object.assign([], this.model.modules);
        //
        //     if (this.model.parent) {
        //         this.model.parent_identifier = this.model.parent.identifier;
        //         delete(this.model.parent.identifier);
        //     }
        //
        //     this.members = this.ProjectsService.getMembersList(this.model);
        //
        //     this.versions = this.getVersions();
        //     this.issuesCategories = this.getIssueCategories();
        //     this.forums = this.getForums();
        //
        //     this.activities = this.getActivities();
        //
        //     this.initialActivities = _.cloneDeep(this.activities);
        //
        //     this.ProjectsService.getList().then((response) => {
        //         this.projects = _.filter(response.data, (item) => (item.identifier !== this.model.identifier));
        //     });
        //
        // });
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