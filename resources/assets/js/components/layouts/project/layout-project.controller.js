import ControllerBase from 'base/controller.base';

/**
 * @property $mdSidenav
 * @property $state
 */
export default class LayoutProjectController extends ControllerBase {

  static get $inject() {
    return ['$state'];
  }

    $onInit() {
        this.items = [
            {url: 'home', name: 'Overview'},
            {url: 'activity', name: 'Activity'},
            {url: 'issues', name: 'Issues'},
            {url: 'calendar', name: 'Calendar'},
            {url: 'wiki', name: 'Wiki'},
            {url: 'settings', name: 'Settings'}
        ];

        this.currentNavItem = this.items.some(item => item.url === this.$state.current.name) ?
          this.$state.current.name : this.items[0].url;
    }

    goto(url){
      this.$state.go(url, {id: this.$state.params.id});
    }

}