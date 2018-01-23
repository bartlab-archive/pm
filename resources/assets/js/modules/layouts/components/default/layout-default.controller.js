import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$mdSidenav} $mdSidenav
 * @property {$state} $state
 * @property {ProjectsService} ProjectsService
 * @property {UsersService} UsersService
 * @property {$transitions} $transitions
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return ['$timeout', '$mdSidenav', '$state', 'ProjectsService', 'UsersService', '$transitions', '$stateParams', '$rootScope'];
    }

    $onInit() {
        this.ProjectsService.getMyList().then((response) => {
            this.projects = response || {};
        });

        this.items = [
            {url: 'home', name: 'Home', icon: 'home'},
            {url: 'projects.list', name: 'Projects', icon: 'work'},
            {url: 'issues.list', name: 'View all issues', icon: 'list'},
            {url: 'home', name: 'Overall spent time', icon: 'timelapse'},
            {url: 'home', name: 'Overall activity', icon: 'history'},
            {url: 'my.page', name: 'My page', icon: 'person'},
            {url: 'admin.index', name: 'Administration', icon: 'settings_applications'},
            // {url: 'agile.index', name: 'Agile', icon: 'dashboard'},
            // {url: 'home', name: 'Help', icon: 'help'}
        ];

        this.UsersService.getUserInfo().then((response) => {
            if (_.get(response, 'data.admin')) {
                this.items.push({url: 'admin.index', name: 'Administration', icon: 'apps'});
            }
        });

        this.newItems = [{
            name: 'Issue',
            url: 'issues-inner.new',
            icon: 'create',
            module: 'issue_tracking',
            single: true,
            enable: false
        }, {
            name: 'Category',
            url: '',
            icon: 'folder',
            module: 'issue_tracking',
            single: false,
            enable: false
        }, {
            name: 'Version',
            url: '',
            icon: 'archive',
            single: false,
            enable: false
        }, {
            name: 'Wiki page',
            url: 'wiki.new',
            icon: 'receipt',
            module: 'wiki',
            single: false,
            enable: false
        }, {
            name: 'File',
            url: '',
            icon: 'attach_file',
            module: 'files',
            single: false,
            enable: false
        }, {
            name: 'Project',
            url: 'projects.new',
            icon: 'work',
            single: true,
            enable: false
        }];

        this.projectItems = [{
            url: 'projects.inner.info',
            title: 'Overview'
        }, {
            url: 'projects.inner.activity',
            title: 'Activity',
            name: 'time_tracking',
            enable: false
        }, {
            url: 'issues-inner.index',
            title: 'Issues',
            name: 'issue_tracking',
            enable: false,
            alt: [/^issues\.*/]
        }, {
            url: 'projects.inner.issues.gantt',
            title: 'Gantt',
            name: 'gantt',
            enable: false
        }, {
            url: 'projects.inner.issues.agile',
            title: 'Agile',
            name: 'agile',
            enable: false
        }, {
            url: 'projects.inner.issues.calendar',
            title: 'Calendar',
            name: 'calendar',
            enable: false
        }, {
            url: 'projects.inner.news',
            title: 'News',
            name: 'news',
            enable: false
        }, {
            url: 'projects.inner.documents',
            title: 'Documents',
            name: 'documents',
            enable: false
        }, {
            url: 'wiki.index',
            title: 'Wiki',
            name: 'wiki',
            enable: false,
            alt: [/^wiki\.*/]
        }, {
            url: 'projects.inner.repository',
            title: 'Repository',
            name: 'repository',
            enable: false
        }, {
            url: 'projects.inner.boards',
            title: 'Forums',
            name: 'boards',
            enable: false
        }, {
            url: 'projects.inner.files',
            title: 'Files',
            name: 'files',
            enable: false
        }, {
            url: 'projects.inner.settings',
            title: 'Settings'
        }];

        this.menuOpen = false;
        this.loadProjectInfo();

        this.$transitions.onSuccess({}, (trans) => this.loadProjectInfo());
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

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

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

    newProject() {
        this.$state.go('projects.new');
        this.toggle('right');
    }

    currentProjectId() {
        return this.$stateParams.hasOwnProperty('project_id') && this.$stateParams.project_id;
    }

    goto(url) {
        const projectId = this.currentProjectId();
        projectId ? this.$state.go(url, {project_id: projectId}) : null;
        _.includes(['projects.new'], url) ? this.$state.go(url, {}) : null;
    }

    loadProjectInfo() {
        const projectIdentifier = this.currentProjectId();
        this.showProjectMenu = !!projectIdentifier;

        if (projectIdentifier) {
            this.ProjectsService.one(projectIdentifier).then((response) => {
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