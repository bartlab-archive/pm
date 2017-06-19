NewsConfig.$inject = ['$stateProvider'];

export default function NewsConfig($stateProvider)  {

    $stateProvider
        .state('news', {
            abstract: true,
            data: {
                access: '@'
            },
            url: '/news',
            parent: 'default',
            views: {
                content: {
                    template: '<ui-view/>'
                }
            }
        })
        .state('news.list', {
            url: '',
            component: 'newsListComponent',
        })
        .state('news.edit', {
            url: '/:id',
            component: 'newsEditComponent',
        })


};

