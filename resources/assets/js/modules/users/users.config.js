import InjectableBase from 'base/injectable.base';
import UsersListComponent from './components/list/users-list.component';
import UsersEditComponent from './components/edit/users-edit.component';
import UsersInfoComponent from './components/info/users-info.component';
import UsersMailsComponent from './components/mails/users-mails.component';

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
            .state('users.list', {
                url: '',
                component: UsersListComponent.getName(),
            })
            .state('users.new', {
                url: '/new',
                component: UsersEditComponent.getName(),
            })
            .state('users.page', {
                url: '/:id',
                abstract: true
            })

            .state('users.page.info', {
                url: '',
                data: {
                    access: '@'
                },
                component: UsersInfoComponent.getName(),
            })
            .state('users.page.edit', {
                url: '/edit',
                component: UsersEditComponent.getName(),
            })
            // todo: redirect to my/emails for non admin user
            .state('users.page.emails', {
                url: '/email_addresses',
                component: UsersMailsComponent.getName(),
            });
    }

}