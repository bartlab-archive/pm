ProjectsConfig.$inject = ['$stateProvider'];

export default function ProjectsConfig($stateProvider) {

    $stateProvider
        .state('projects', {
            abstract: true,
            data: {
                access: '@'
            },
            url: '/projects',
            parent: 'default',
            views: {
                content: {
                    template: '<ui-view/>'
                }
            }
        })
        .state('projects.list', {
            url: '',
            component: 'projectsListComponent',
        })
        .state('projects.new', {
            url: '/new',
            component: 'projectsNewComponent',
        });
}
;
