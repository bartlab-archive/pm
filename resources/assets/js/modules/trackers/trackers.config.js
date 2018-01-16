import InjectableBase from 'base/injectable.base';
import TrackersIndexComponent from './components/index/trackers-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class TrackersConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('trackers', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/trackers',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('trackers.index', {
                url: '',
                component: TrackersIndexComponent.name,
            });
    }

}