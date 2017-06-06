import Injecteble from 'base/injectable';

/**
 * Class UsersConfig
 *
 * @property $stateProvider
 */
export default class UsersConfig extends Injecteble {

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
            .state('users.list', {
                url: '',
                component: 'usersListComponent',
            })
            .state('users.new', {
                url: '/new',
                component: 'usersEditComponent',
            })
            .state('users.info', {
                url: '/:id',
                component: 'usersInfoComponent',
            })
            .state('users.edit', {
                url: '/:id/edit',
                component: 'usersEditComponent',
            });
    }
}