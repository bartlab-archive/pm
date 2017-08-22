import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property $mdSidenav
 * @property $state
 * @property ProjectsService
 * @property UsersService
 * @property $transitions
 * @property $stateParams
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return ['$mdSidenav', '$state', 'ProjectsService', 'UsersService', '$transitions', '$stateParams'];
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
            {name: 'New issue', url: 'issues-inner.create', icon: 'create'},
            {name: 'New category', url: '', icon: 'folder'},
            {name: 'New version', url: '', icon: 'archive'},
            {name: 'New wiki page', url: '', icon: 'receipt'},
            {name: 'New file', url: '', icon: 'attach_file'},
        ];

        this.projectItems = [
            {url: 'projects.inner.info', name: 'Overview'},
            {url: 'projects.inner.activity', name: 'Activity'},
            {url: 'projects.inner.issues.index', name: 'Issues'},
            {url: 'projects.inner.issues.gantt', name: 'Gantt'},
            {url: 'projects.inner.issues.calendar', name: 'Calendar'},
            {url: 'projects.inner.news', name: 'News'},
            {url: 'projects.inner.documents', name: 'Documents'},
            {url: 'projects.inner.wiki.index', name: 'Wiki'},
            {url: 'projects.inner.boards', name: 'Forums'},
            {url: 'projects.inner.files', name: 'Files'},
            {url: 'projects.inner.settings', name: 'Settings'}
        ];

        this.menuOpen = false;
        this.showProjectMenu = _.get(this.$state, 'current.data.layoutDefault.showProjectMenu', false) || !!_.get(this.$stateParams, 'project_id');
        this.$transitions.onStart({}, (...args) => this.checkShowProjectMenu(...args));

        // this.load();
    }

    checkShowProjectMenu(trans) {
        this.showProjectMenu = _.get(trans.$to(), 'data.layoutDefault.showProjectMenu', false) || !!_.get(this.$stateParams, 'project_id');
    }

    getStateData(params) {
        return !!_.get(params, 'project_id');

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

    goto(url) {
        let projectId = _.get(this.$state, 'data.layoutDefault.projectId') || _.get(this.$stateParams, 'project_id');
        if (projectId) {
            this.$state.go(url, {project_id: projectId});
        }
    }

    load() {
        let project_id = _.get(this.$stateParams, 'project_id');
        console.log(project_id);
        if (!project_id) {
            return;
        }
        this.ProjectsService.one(project_id).then((response) => {
            this.items = _.get(response, 'data.enabled_modules', []);

            // _.forEach(this.items, (item) => {
            // switch (item.name) {
            //     case 'issue_tracking' :
            //         item.url = 'projects-inner.activity';
            //         break;
            //
            //     case 'wiki' :
            //         item.url = 'projects-inner.wiki.index';
            //         break;
            //
            //     case 'files' :
            //         item.url = 'projects-inner.files';
            //         break;
            //
            //     case 'documents' :
            //         item.url = 'projects-inner.documents';
            //         break;
            //
            //     case 'calendar' :
            //         item.url = 'projects-inner.issues.calendar';
            //         break;
            //
            //     case 'gantt' :
            //         item.url = 'projects-inner.issues.gantt';
            //         break;
            //
            //     default :
            //         item.url = 'projects-inner.info';
            //         break;
            // }
            // });

            // this.currentNavItem = [
            //     {url: 'projects-inner.issues.index', name: 'Issues'}
            // ];

            // this.items.unshift({url: 'projects-inner.issues.index', name: 'Issues'});
            // this.items.unshift({url: 'projects-inner.info', name: 'Overview'});
            // this.items.push({url: 'projects-inner.settings', name: 'Settings'});

            // this.currentNavItem = _.get(
            //     _.find(this.items, {url: this.$state.current.name}),
            //     'url',
            //     this.items[0].url
            // );
        });
    }
}