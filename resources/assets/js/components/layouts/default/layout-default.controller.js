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
            {url: 'admin.index', name: 'Administration', icon: 'apps'},
            {
                url: 'projects.list', name: 'Projects', icon: 'work', children: {
                items: [
                    {url: 'home', name: 'project1', icon: 'apps'},
                    {url: 'admin.index', name: 'project2', icon: 'apps'},
                    {url: 'home', name: 'project3', icon: 'apps'},
                ],
                shown: false
            }
            },
            {url: 'home', name: 'My page', icon: 'person'},
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

    menuClick(item) {
        if (item.hasOwnProperty('children')) {
            item.children.shown = !item.children.shown;
        } else {
            this.$state.go(item.url);
            this.toggle();
        }
    }
}