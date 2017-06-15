import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $state
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return ['$mdSidenav', '$state', 'ProjectsService'];
    }

    $onInit() {
        this.items = [
            {url: 'home', name: 'Home', icon: 'home'},
            {url: 'projects.list', name: 'Projects', icon: 'work'},
            {url: 'home', name: 'View all issues', icon: 'list'},
            {url: 'home', name: 'Overall spent time', icon: 'timelapse'},
            {url: 'home', name: 'Overall activity', icon: 'history'},
            {url: 'admin.index', name: 'Administration', icon: 'apps'},
            {url: 'home', name: 'My page', icon: 'person'},
            {url: 'home', name: 'Help', icon: 'help'}
        ];

        this.ProjectsService.getMyList().then((response) => {
            this.projects = response;
        });
    }

    toggle(menu = 'left') {
        this.$mdSidenav(menu).toggle();
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    gotToProject(id) {
        this.$state.go('projects-inner.info', {id: id});
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
}