ProjectsConfig.$inject = ['$stateProvider'];

export default function ProjectsConfig($stateProvider) {

    $stateProvider
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
        });
}
;
