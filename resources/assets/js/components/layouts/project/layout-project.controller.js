import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $state
 */
export default class LayoutProjectController extends ControllerBase {

    $onInit() {
        this.items = [
            {url: 'home', name: 'Overview'},
            {url: 'activity', name: 'Activity'},
            {url: 'issues', name: 'Issues'},
            {url: 'calendar', name: 'Calendar'},
            {url: 'wiki', name: 'Wiki'},
            {url: 'settings', name: 'Settings'}
        ];

        this.currentNavItem = this.items[0].url;
    }

    goto(url){
        console.log(url);
        // this.currentNavItem = url;
    }

}