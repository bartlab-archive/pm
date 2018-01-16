import InjectableBase from 'base/injectable.base';
import groupsIndexComponent from './components/index/groups-index.component';
import groupsEditComponent from './components/edit/groups-edit.component';
import groupsNewComponent from './components/new/groups-new.component';

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
            }).state('groups.edit', {
                   url: '/:id/edit',
                   component: groupsEditComponent.name,
            }).state('groups.new', {
                   url: '/new',
                   component: groupsNewComponent.name,
            });
    }
}