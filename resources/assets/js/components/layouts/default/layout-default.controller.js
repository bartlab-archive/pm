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
            {url: 'admin.index', name: 'Administration', icon: 'apps'},
            {url: 'home', name: 'My page', icon: 'person'},
            {url: 'home', name: 'Help', icon: 'help'}
        ];

        this.ProjectsService.getList()
            .then(response => this.projects = response.data)
            .catch(console.log);

    }

    toggle(menu = 'left') {
        this.$mdSidenav(menu).toggle();
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    gotToProject(id) {
        this.$state.go('projects.info', {id: id});
        this.toggle('right');
    }

    myAccount() {
        this.$state.go('my.account');
    }

    logout() {
        this.$state.go('logout');
    }

    menuClick(item) {
        if (item.hasOwnProperty('children')) {
            item.children.shown = !item.children.shown;
            console.log(this.projects);
        } else {
            this.$state.go(item.url);
            this.toggle();
        }
    }
}