import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $state
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return ['$mdSidenav', '$state', 'ProjectsService', '$scope'];
    }

    $onInit() {

        this.$scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            console.log(toState, toParams, fromState, fromParams);
        });

        this.open = true;

        this.items = [
            {url: 'home', name: 'Home', icon: 'home'},
            {url: 'projects.list', name: 'Projects', icon: 'work'},
            {url: 'issues.list', name: 'View all issues', icon: 'list'},
            {url: 'home', name: 'Overall spent time', icon: 'timelapse'},
            {url: 'home', name: 'Overall activity', icon: 'history'},
            {url: 'admin.index', name: 'Administration', icon: 'apps'},
            {url: 'my.page', name: 'My page', icon: 'person'},
            // {url: 'home', name: 'Help', icon: 'help'}
        ];

        this.secondMenuItems = [
            {url: 'projects-inner.info', name: 'Overview'},
            {url: 'projects-inner.activity', name: 'Activity'},
            {url: 'projects-inner.issues.index', name: 'Issues'},
            {url: 'projects-inner.issues.gantt', name: 'Gantt'},
            {url: 'projects-inner.issues.calendar', name: 'Calendar'},
            {url: 'projects-inner.news', name: 'News'},
            {url: 'projects-inner.documents', name: 'Documents'},
            {url: 'projects-inner.wiki.index', name: 'Wiki'},
            {url: 'projects-inner.boards', name: 'Forums'},
            {url: 'projects-inner.files', name: 'Files'},
            {url: 'projects-inner.settings', name: 'Settings'}
        ];

        this.ProjectsService.getMyList().then((response) => {
            this.projects = response;
        });
    }

    toggle(menu = 'right') {
        this.$mdSidenav(menu).toggle();

    }

    toggleLeftMenu() {
        this.open = !this.open;
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    gotToProject(id) {
        this.$state.go('projects-inner.info', {id: id});
        this.toggle('right');
    }

    goTo(url) {
        console.log(url);
        this.$state.go(url);
    }

    myAccount() {
        this.$state.go('my.account');
    }

    logout() {
        this.$state.go('logout');
    }

    menuClick(item) {
        this.$state.go(item.url);
        // this.toggle();
    }

    newProject() {
        this.$state.go('projects.new');
        this.toggle('right');
    }
}