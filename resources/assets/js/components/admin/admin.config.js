ProjectsConfig.$inject = ['$stateProvider'];

export default function ProjectsConfig($stateProvider) {

    $stateProvider
        .state('admin', {
            abstract: true,
            data: {
                access: '@'
            },
            url: '/admin',
            parent: 'default',
            views: {
                content: {
                    template: '<ui-view/>'
                }
            }
        })
        .state('admin.index', {
            url: '',
            component: 'adminIndexComponent',
        });
}
;
