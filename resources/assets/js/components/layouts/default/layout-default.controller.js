export default class LayoutDefaultController {

    static get $inject() {
        return ['$injector'];
    }

    constructor($injector) {
        this.$mdSidenav = $injector.get('$mdSidenav');
        this.$state = $injector.get('$state');

        this.items = [
            {url:'home',name:'Home',icon:'home'},
            {url:'',name:'My page',icon:'person'},
            {url:'projects.list',name:'Projects',icon:'work'},
            {url:'admin.index',name:'Administration',icon:'apps'},
            {url:'',name:'Help',icon:'help'}
        ];
    }

    $onInit() {
    }

    toggle() {
        this.$mdSidenav('left').toggle();
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    myAccount() {
        this.$state.go('my-account');
    }

    logout(){
        this.$state.go('logout');
    }
    gothoughmenu(route){
        this.$state.go(route);
        this.toggle();
    }
}