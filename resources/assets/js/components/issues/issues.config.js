IssuesConfig.$inject = ['$stateProvider'];

export default function IssuesConfig($stateProvider) {

    $stateProvider
        .state('issues', {
            abstract: true,
            data: {
                access: '?'
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
        .state('issues.edit', {
            url: '/:id',
            component: 'issuesEditComponent',
        })


}
;
