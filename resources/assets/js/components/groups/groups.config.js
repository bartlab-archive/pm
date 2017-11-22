import InjectableBase from 'base/injectable.base';
import groupsIndexComponent from './index/groups-index.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class GroupsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider']
    }

    $onInit() {
        this.$stateProvider
            .state('groups', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/groups',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('groups.index', {
                url: '',
                component: groupsIndexComponent.name,
            });
    }

}