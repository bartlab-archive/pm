import InjectableBase from 'base/injectable.base';
import GroupsIndexComponent from './components/index/groups-index.component';
import GroupsEditComponent from './components/edit/groups-edit.component';
import GroupsNewComponent from './components/new/groups-new.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class GroupsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider']
    }

    $onInit() {
        this.mainServiceProvider
            .registerAdminMenu({
                name: 'Groups',
                url: 'groups.index',
                icon: 'group'
            });

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
                component: GroupsIndexComponent.getName(),
            })
            .state('groups.edit', {
                url: '/:id/edit',
                component: GroupsEditComponent.getName(),
            })
            .state('groups.new', {
                url: '/new',
                component: GroupsNewComponent.getName(),
            });
    }
}