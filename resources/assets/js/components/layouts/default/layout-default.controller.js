import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $state
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return ['$mdSidenav', '$state'];
    }

    $onInit() {
        this.items = [
            {url: 'home', name: 'Home', icon: 'home'},
            {url: 'home', name: 'My page', icon: 'person'},
            {url: 'projects.list', name: 'Projects', icon: 'work'},
            {url: 'admin.index', name: 'Administration', icon: 'apps'},
            {url: 'home', name: 'Help', icon: 'help'}
        ];
    }

    toggle() {
        this.$mdSidenav('left').toggle();
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    myAccount() {
        this.$state.go('my.account');
    }

    logout() {
        this.$state.go('logout');
    }

    gothoughmenu(route) {
        this.$state.go(route);
        this.toggle();
    }
}