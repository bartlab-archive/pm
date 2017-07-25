import ControllerBase from 'base/controller.base';
import * as _ from "lodash";

/**
 * @property $mdSidenav
 * @property $state
 * @property $transitions
 * @property $stateParams
 * @property $window
 */
export default class LayoutDefaultController extends ControllerBase {

    static get $inject() {
        return ['$mdSidenav', '$state', '$transitions', 'ProjectsService', '$stateParams', '$window'];
    }

    $onInit() {

        this.showAdditionalMenu = !!this.$stateParams.project_id;

        this.$transitions.onSuccess({}, ($transitions) => {
            this.showAdditionalMenu = _.get($transitions.$to(), 'parent.data.showInnerMenu', false);
        });

        angular.element(this.$window).bind('resize', () => this.setScrollbarContainerHeight());
        this.setScrollbarContainerHeight();

        this.isMobile = this.$window.innerWidth < 1280;

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
        if (this.isMobile) {
            this.open = true;
            this.$mdSidenav('left').toggle();
        }
    }

    openUserMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    gotToProject(id) {
        this.$state.go('projects-inner.info', {id: id});
        this.toggle('right');
    }

    goTo(url) {
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

    setScrollbarContainerHeight() {
        let windowHeight = this.$window.innerHeight;
        this.scrollBarConfig = {
            setHeight: windowHeight - 64
        };
    }
}