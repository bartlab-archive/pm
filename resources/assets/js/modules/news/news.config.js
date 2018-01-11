import InjectableBase from 'base/injectable.base';
import newsListComponent from './components/list/news-list.component';
import newsEditComponent from './components/edit/news-edit.component';
import newsViewComponent from './components/view/news-view.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class NewsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider'];
    }

    $onInit() {
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
            .state('news.index', {
                url: '/:id',
                component: newsViewComponent.name,
            })
            .state('news.list', {
                url: '',
                component: newsListComponent.name,
            })
            .state('news.edit', {
                url: '/:id',
                component: newsEditComponent.name,
            })
    }

}

