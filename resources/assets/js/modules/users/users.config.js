import InjectableBase from 'base/injectable.base';
import UsersListComponent from './components/list/users-list.component';
import UsersEditComponent from './components/edit/users-edit.component';
import UsersInfoComponent from './components/info/users-info.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class UsersConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider'];
    }

    $onInit() {
        this.mainServiceProvider
            .registerAdminMenu({
                name: 'Users',
                url: 'users.list',
                icon: 'person'
            });

        this.$stateProvider
            .state('users', {
                abstract: true,
                data: {
                    access: '!'
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
                component: UsersListComponent.getName(),
            })
            .state('users.new', {
                url: '/new',
                component: UsersEditComponent.getName(),
            })
            .state('users.info', {
                url: '/:id',
                component: UsersInfoComponent.getName(),
            })
            .state('users.edit', {
                url: '/:id/edit',
                component: UsersEditComponent.getName(),
            });
    }

}