import InjectableBase from 'base/injectable.base';
import NewsListComponent from './components/list/news-list.component';
import NewsEditComponent from './components/edit/news-edit.component';
import NewsViewComponent from './components/view/news-view.component';
import NewsMyLatestComponent from './components/my-latest/news-my-latest.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class NewsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider', 'myServiceProvider'];
    }

    $onInit() {
        this.projectsServiceProvider.registerModule({
            url: 'projects.inner.news',
            title: 'News',
            name: 'news',
            enable: false
        });

        this.myServiceProvider
            .registerModule({
                // todo: make url with filter
                // url: 'issues.list',
                // title: 'Reported issues',
                // name: 'issue_tracking',
                component: NewsMyLatestComponent.getName()
            });

        this.$stateProvider
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
            .state('news-inner', {
                abstract: true,
                url: '/news',
                parent: 'projects.inner',
            })
            .state('news-inner.list', {
                url: '',
                component: NewsListComponent.getName(),
            })
            .state('news.index', {
                url: '/:id',
                component: NewsViewComponent.getName(),
            })
            .state('news.list', {
                url: '',
                component: NewsListComponent.getName(),
            })
            .state('news.edit', {
                url: '/:id',
                component: NewsEditComponent.getName(),
            })
    }

}

