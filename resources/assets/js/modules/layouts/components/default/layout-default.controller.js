import ControllerBase from 'base/controller.base';
import _ from 'lodash';
import 'angular';

/**
 * @property {$timeout} $timeout
 * @property {$mdSidenav} $mdSidenav
 * @property {$state} $state
 * @property {ProjectsService} projectsService
 * @property {MainService} mainService
 * @property {UsersService} usersService
 * @property {$transitions} $transitions
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {$filter} $filter
 * @property {SettingsService} settingsService
 * @property {AuthService} authService
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return [
            '$timeout', '$mdSidenav', '$state', 'projectsService', 'mainService', 'usersService',
            '$transitions', '$stateParams', '$rootScope', '$filter', 'settingsService', 'authService',
            'storageService'
        ];
    }

    $onInit() {
        // todo: show current user avatar in main menu

        this.items = this.mainService.getAppMenu().filter((item) => {
            return (
                (!item.access) ||
                (item.access === '?' && !this.authService.isAuthenticated()) ||
                (item.access === '@' && this.authService.isAuthenticated()) ||
                (item.access === '!' && this.authService.isAuthenticated() && this.authService.isAdmin())
            );
        });
        this.userId = this.storageService.getUserData('id');
        this.newItems = this.mainService.getNewItemMenu();
        this.projectItems = this.projectsService.getModules();

        // this.setTitle();
        this.menuOpen = false;
        this.loadProjectInfo();
        this.loadMyProjects();

        this.$transitions.onSuccess({}, () => this.loadProjectInfo());
        this.updateProjectInfo = this.$rootScope.$on('updateProjectInfo', () => {
            this.loadProjectInfo();
            this.loadMyProjects();
        });
    }

    $onDestroy() {
        this.updateProjectInfo();
    }

    loadMyProjects() {
        // todo: add is_my param to request
        // todo: load only needed info from projects list
        this.projectsService
            .all()
            .then((response) => {
                this.projects = response.data.data.map((project) => {
                    project.name = this.$filter('words')(project.name, 3);
                    project.avatar = this.$filter('limitTo')(project.name, 1);
                    return project;
                });
            });
    }

    setTitle(title) {
        if (!title && !this.appTitle) {
            this.settingsService
                .one('app_title')
                .then((response) => {
                    this.appTitle = response.data.data.value;
                    this.title = this.appTitle;
                });
        } else {
            this.title = title || this.appTitle;
        }
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

    // todo: replace to ui-sref directive
    gotToProject(identifier) {
        this.$state.go('projects.inner.info', {project_id: identifier});
        this.toggle('right');
    }

    // todo: replace to ui-sref directive
    // myAccount() {
    //     this.$state.go('my.account');
    // }

    // todo: replace to ui-sref directive
    // logout() {
    //     this.$state.go('logout');
    // }

    // todo: replace to ui-sref directive
    menuClick(item) {
        this.$state.go(item.url);
        this.toggle();
    }

    openProjectPage(item) {
        const projectId = this.projectsService.getCurrentId();

        if (projectId) {
            this.$state.go(item.url, {project_id: projectId})
        }
    }

    openNewItemPage(item) {
        const projectId = this.projectsService.getCurrentId();
        const url = projectId || typeof item.single !== 'string' ? item.url : item.single;

        this.$state.go(
            url,
            projectId ? {project_id: projectId} : undefined
        );
    }

    loadProjectInfo() {
        const projectIdentifier = this.projectsService.getCurrentId();
        this.showProjectMenu = !!projectIdentifier || _.get(this.$state, 'current.data.layout.insideProject');

        if (projectIdentifier) {
            this.projectsService.one(projectIdentifier).then((response) => {
                let modules = _.get(response, 'data.data.modules', []);

                // change visible items in project menu and generate sref string
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

                this.setTitle(response.data.data.name);
            });
        } else {
            this.newItems.forEach((item) => {
                item.enable = (item.single && (this.$state.current.name !== item.url && this.$state.current.name !== item.single));
            });

            this.setTitle();
        }
    }

}