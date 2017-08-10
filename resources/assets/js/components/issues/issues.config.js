IssuesConfig.$inject = ['$stateProvider'];

export default function IssuesConfig($stateProvider) {

    $stateProvider
        .state('issues', {
            abstract: true,
            data: {
                access: '@'
            },
            url: '/issues',
            parent: 'default',
            views: {
                content: {
                    template: '<ui-view/>'
                }
            }
        })
        .state('issues-inner', {
            abstract: true,
            data: {
                access: '@'
            },
            url: '/projects/{project_id:[a-z][a-z0-9-_]{0,99}}/issues',
            parent: 'project',
            views: {
                content: {
                    template: '<ui-view/>'
                }
            }
        })
        .state('issues.list', {
            url: '',
            component: 'issuesListComponent',
        })
        .state('issues-inner.create', {
            url: '/new',
            component: 'issuesNewComponent',
        })
        .state('issues-inner.edit', {
            url: '/:id',
            component: 'issuesEditComponent',
        })
        .state('issues-inner.info', {
            url: '/:id',
            component: 'issuesInfoComponent',
        })



}
;
