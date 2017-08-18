IssuesConfig.$inject = ['$stateProvider'];

export default function IssuesConfig($stateProvider) {

    $stateProvider
        .state('issues', {
            abstract: true,
            data: {
                access: '@',
                layoutDefault: {
                    projectId: null,
                    showProjectMenu: true
                }
            },
            url: '/issues',
            parent: 'default',
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
        // .state('issues-inner.create', {
        //     url: '/new',
        //     component: 'issuesNewComponent',
        // })
        // .state('issues.edit', {
        //     url: '/:id',
        //     component: 'issuesEditComponent',
        // })
        .state('issues.info', {
            url: '/:id',
            component: 'issuesInfoComponent',
        })


}
;
