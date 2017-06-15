import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $stateParams
 * @property $state
 */
export default class LayoutProjectController extends ControllerBase {

    static get $inject() {
        return ['$state', '$stateParams'];
    }

    $onInit() {
        this.items = [
            {url: 'projects-inner.info', name: 'Overview'},
            {url: 'projects-inner.activity', name: 'Activity'},
            {url: 'projects-inner.issues.index', name: 'Issues'},
            {url: 'projects-inner.issues.gantt', name: 'Gantt'},
            {url: 'projects-inner.issues.calendar', name: 'Calendar'},
            {url: 'projects-inner.news', name: 'News'},
            {url: 'projects-inner.documents', name: 'Documents'},
            {url: 'projects-inner.wiki', name: 'Wiki'},
            {url: 'projects-inner.boards', name: 'Forums'},
            {url: 'projects-inner.files', name: 'Files'},
            {url: 'projects-inner.settings', name: 'Settings'}
        ];

        this.newItems = [
            'New issue',
            'New category',
            'New version',
            'New wiki page',
            'New file',
        ];

        this.currentNavItem = _.get(
            _.find(this.items, {url: this.$state.current.name}),
            'url',
            this.items[0].url
        );
    }

    goto(url) {
        // console.log(url, this.$stateParams.id);
        this.$state.go(url);
        // this.$state.go(url, {id: this.$stateParams.id});
    }

    openNewObjectMenu($mdMenu, $event) {
        $mdMenu.open($event);
    }

}