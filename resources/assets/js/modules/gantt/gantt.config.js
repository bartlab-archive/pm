import InjectableBase from 'base/injectable.base';
import ganttIndexComponent from './components/index/gantt-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class GanttConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('gantt', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/issues/gantt',
                parent:'projects.inner',
                component: ganttIndexComponent.name,
            })
            .state('gantt.index', {
                url: '',
                component: ganttIndexComponent.name,
            });
    }

}