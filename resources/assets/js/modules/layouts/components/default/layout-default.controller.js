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
        return ['$timeout', '$mdSidenav', '$state', 'projectsService', 'mainService', 'usersService', '$transitions', '$stateParams', '$rootScope'];
    }

    $onInit() {
        // this.ProjectsService.getMyList().then((response) => {
        //     this.projects = response || {};
        // });

        this.items = this.mainService.getAppMenu();
        this.newItems = this.mainService.getNewItemMenu();
        this.projectItems = this.projectsService.getModules();

        this.setTitle();
        this.menuOpen = false;
        this.loadProjectInfo();

        this.$transitions.onSuccess({}, () => this.loadProjectInfo());
        this.$rootScope.$on('updateProjectInfo', () => this.loadProjectInfo());
    }

    setTitle(title){
        // todo: get title from config
        this.title = title || 'MaybeWorks PM';
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
        const projectId = this.projectsService.getCurrentId();

        projectId ? this.$state.go(url, {project_id: projectId}) : null;
        _.includes(['projects.new'], url) ? this.$state.go(url, {}) : null;
    }

    loadProjectInfo() {
        const projectIdentifier = this.projectsService.getCurrentId();
        this.showProjectMenu = !!projectIdentifier;

        if (projectIdentifier) {
            this.projectsService.one(projectIdentifier).then((response) => {
                let modules = _.get(response, 'data.modules', []);

                // change visible items in project menu
                this.projectItems.forEach((item) => {
                    if (item.name) {
                        item.enable = modules.some((value) => value.name === item.name && value.enabled === true);
                    }
                });

                // change visible items in add menu
                this.newItems.forEach((item) => {
                    item.enable = ((!item.module || modules.some((value) => value.name === item.module)) && this.$state.current.name !== item.url);
                });

                // highlight current item in project menu
                this.hlCurrentNavItem();

                this.setTitle(response.data.data.name);
            });
        } else {
            this.newItems.forEach((item) => {
                item.enable = (item.single && this.$state.current.name !== item.url);
            });

            this.setTitle();
        }
    }

}