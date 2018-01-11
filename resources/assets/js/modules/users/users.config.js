import InjectableBase from 'base/injectable.base';
import usersListComponent from './components/list/users-list.component';
import usersEditComponent from './components/edit/users-edit.component';
import usersInfoComponent from './components/info/users-info.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class UsersConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider'];
    }

    $onInit() {
        this.$stateProvider
            .state('users', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/users',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            // .state('users.inner', {
            //     abstract: true,
            //     data: {
            //       access: '@'
            //     },
            //     url: '',
            //     template: '<ui-view/>'
            // })
            .state('users.list', {
                url: '',
                component: usersListComponent.name,
            })
            .state('users.new', {
                url: '/new',
                component: usersEditComponent.name,
            })
            .state('users.info', {
                url: '/:id',
                component: usersInfoComponent.name,
            })
            .state('users.edit', {
                url: '/:id/edit',
                component: usersEditComponent.name,
            });
    }

}