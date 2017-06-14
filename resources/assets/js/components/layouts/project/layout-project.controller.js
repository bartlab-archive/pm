import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $state
 */
export default class LayoutProjectController extends ControllerBase {

    $onInit() {
        this.items = [
            {url: 'projects-inner.info', name: 'Overview'},
            {url: 'projects-inner.activity', name: 'Activity'},
            {url: 'projects-inner.issues', name: 'Issues'},
            {url: 'projects-inner.calendar', name: 'Calendar'},
            {url: 'projects-inner.wiki', name: 'Wiki'},
            {url: 'projects-inner.settings', name: 'Settings'}
        ];

        this.newItems = [
            'New issue',
            'New category',
            'New version',
            'New wiki page',
            'New file',
        ];

        this.currentNavItem = this.items[0].url;
    }

    goto(url) {
        console.log(url);
        // this.currentNavItem = url;
    }

    openNewObjectMenu($mdMenu, $event) {
        $mdMenu.open($event);
    }

}