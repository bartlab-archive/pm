import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

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
        return ['$mdSidenav', '$state', 'ProjectsService', 'UsersService', '$transitions', '$stateParams', '$rootScope'];
    }

    $onInit() {

        this.items = [
            {url: 'home', name: 'Home', icon: 'home'},
            {url: 'projects.list', name: 'Projects', icon: 'work'},
            {url: 'issues.list', name: 'View all issues', icon: 'list'},
            {url: 'home', name: 'Overall spent time', icon: 'timelapse'},
            {url: 'home', name: 'Overall activity', icon: 'history'},
            {url: 'my.page', name: 'My page', icon: 'person'},
            // {url: 'home', name: 'Help', icon: 'help'}
        ];

        this.UsersService.getUserInfo().then((response) => {
            if (_.get(response, 'data.admin')) {
                this.items.push({url: 'admin.index', name: 'Administration', icon: 'apps'});
            }
        });

        this.newItems = [
            {name: 'New issue', url: 'projects.inner.issues.new', icon: 'create'},
            {name: 'New category', url: '', icon: 'folder'},
            {name: 'New version', url: '', icon: 'archive'},
            {name: 'New wiki page', url: 'projects.inner.wiki.new', icon: 'receipt'},
            {name: 'New file', url: '', icon: 'attach_file'},
            {name: 'New project', url: 'projects.new', icon: 'work'},
        ];

        this.projectItems = [
            {url: 'projects.inner.info', title: 'Overview'},
            {url: 'projects.inner.activity', title: 'Activity', name: 'time_tracking', enable: false},
            {url: 'projects.inner.issues.index', title: 'Issues', name: 'issue_tracking', enable: false},
            {url: 'projects.inner.issues.gantt', title: 'Gantt', name: 'gantt', enable: false},
            {url: 'projects.inner.issues.calendar', title: 'Calendar', name: 'calendar', enable: false},
            {url: 'projects.inner.news', title: 'News', name: 'news', enable: false},
            {url: 'projects.inner.documents', title: 'Documents', name: 'documents', enable: false},
            {url: 'projects.inner.wiki.index', title: 'Wiki', name: 'wiki', enable: false},
            {url: '', title: 'Repository', name: 'repository', enable: false},
            {url: 'projects.inner.boards', title: 'Forums', name: 'boards', enable: false},
            {url: 'projects.inner.files', title: 'Files', name: 'files', enable: false},
            {url: 'projects.inner.settings', title: 'Settings'}
        ];

        this.menuOpen = false;
        this.checkShowProjectMenu(this.$state.current);

        this.$transitions.onSuccess({}, (trans) => this.checkShowProjectMenu(trans.$to()));
        this.$rootScope.$on('updateProjectInfo', () => this.loadProjectInfo());
    }

    checkShowProjectMenu(state) {
        this.showProjectMenu = _.get(state, 'data.layoutDefault.showProjectMenu', false) || !!_.get(this.$stateParams, 'project_id');
        if (this.showProjectMenu) {
            this.loadProjectInfo();
        }
    }

    toggle(menu = 'left') {
        this.$mdSidenav(menu).toggle();
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    gotToProject(id) {
        this.$state.go('projects.inner.info', {id: id});
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
        return _.get(this.$state, 'data.layoutDefault.projectId') || _.get(this.$stateParams, 'project_id');
    }

    goto(url) {
        let projectId = this.currentProjectId();

        projectId ? this.$state.go(url, {project_id: projectId}) : null;
        _.includes(['projects.new'], url) ? this.$state.go(url, {}) : null;
    }

    loadProjectInfo() {
        let projectIdentifier = this.currentProjectId();

        if (projectIdentifier) {
            this.ProjectsService.one(projectIdentifier).then((response) => {
                this.enabledModules = [];
                let modules = _.get(response, 'data.enabled_modules', []);
                _.forEach(this.projectItems, (module) => {
                    if (module.name) {
                        module.enable = _.some(modules, {name: module.name});
                    }
                });

                this.enabledModules = this.ProjectsService.getModules(modules);
            });
        }
    }

    showFabAction(item){
        if (item.name === 'New issue'){
            return typeof this.enabledModules !== 'undefined' && typeof this.enabledModules.issue_tracking !== 'undefined';
        }
        return true;
    }
}