import InjectableBase from "base/injectable.base";
import newsListComponent from './list/news-list.component';
import newsEditComponent from './edit/news-edit.component';

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

