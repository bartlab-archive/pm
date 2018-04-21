import InjectableBase from 'base/injectable.base';
import GanttIndexComponent from './components/index/gantt-index.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {ProjectsServiceProvider} ProjectsServiceProvider
 */
export default class GanttConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider'];
    }

    $onInit() {
        this.projectsServiceProvider.registerModule({
            url: 'gantt-inner.index',
            title: 'Gantt',
            name: 'gantt',
            enable: false
        });

        this.$stateProvider
            .state('gantt-inner', {
                abstract: true,
                url: '/gantt',
                parent: 'issues-inner',
            })
            .state('gantt-inner.index', {
                url: '',
                component: GanttIndexComponent.getName(),
            });
    }

}

