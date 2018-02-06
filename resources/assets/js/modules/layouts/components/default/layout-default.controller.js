import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$mdSidenav} $mdSidenav
 * @property {$state} $state
 * @property {ProjectsService} ProjectsService
 * @property {object} MainService
 * @property {UsersService} UsersService
 * @property {$transitions} $transitions
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return ['$timeout', '$mdSidenav', '$state', 'ProjectsService', 'MainService', 'UsersService', '$transitions', '$stateParams', '$rootScope'];
    }

    $onInit() {
        // this.ProjectsService.getMyList().then((response) => {
        //     this.projects = response || {};
        // });

        this.items = this.MainService.getAppMenu();
        this.newItems = this.MainService.getNewItemMenu();
        this.projectItems = this.ProjectsService.getModules();

        this.menuOpen = false;
        this.loadProjectInfo();

        this.$transitions.onSuccess({}, () => this.loadProjectInfo());
        this.$rootScope.$on('updateProjectInfo', () => this.loadProjectInfo());
    }

    hlCurrentNavItem() {
        // this is used to display navbar ink bar (underline red bar) on first load
        this.currentNavItem = '';

        this.$timeout(() => {
            this.currentNavItem = _.get(
                this.projectItems.find((item) => {
                    return item.url === this.$state.$current.name || (item.alt && !!item.alt.find((alt) => {
                        return this.$state.$current.name.match(alt);
                    }));
                }), 'url');
        }, 0);
    }

    toggle(menu = 'left') {
        this.$mdSidenav(menu).toggle();
    }

    gotToProject(identifier) {
        this.$state.go('projects.inner.info', {project_id: identifier});
        this.toggle('right');
    }

    myAccount() {
        this.$state.go('my.account');
    }

    logout() {
        this.$state.go('logout');
    }

    menuClick(item) {
        this.$state.go(item.url);
        this.toggle();
    }

    goto(url) {
        const projectId = this.ProjectsService.getCurrentId();

        projectId ? this.$state.go(url, {project_id: projectId}) : null;
        _.includes(['projects.new'], url) ? this.$state.go(url, {}) : null;
    }

    loadProjectInfo() {
        const projectIdentifier = this.ProjectsService.getCurrentId();
        this.showProjectMenu = !!projectIdentifier;

        if (projectIdentifier) {
            this.ProjectsService.one(projectIdentifier).get().then((response) => {
                let modules = _.get(response, 'data.enabled_modules', []);

                // change visible items in project menu
                this.projectItems.forEach((item) => {
                    if (item.name) {
                        item.enable = modules.some((value) => value.name === item.name);
                    }
                });

                // change visible items in add menu
                this.newItems.forEach((item) => {
                    item.enable = ((!item.module || modules.some((value) => value.name === item.module)) && this.$state.current.name !== item.url);
                });

                // highlight current item in project menu
                this.hlCurrentNavItem();
            });
        } else {
            this.newItems.forEach((item) => {
                item.enable = (item.single && this.$state.current.name !== item.url);
            });
        }
    }

}