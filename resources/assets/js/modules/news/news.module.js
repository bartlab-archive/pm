import 'angular';
import NewsConfig from './news.config';
import NewsService from './services/news.service';
import newsEditComponent from './components/edit/news-edit.component';
import newsListComponent from './components/list/news-list.component';
import newsViewComponent from './components/view/news-view.component';

angular.module('app.modules.news', [])
    .config(NewsConfig.inst())
    .service('NewsService', NewsService)
    .component(newsEditComponent.name, newsEditComponent)
    .component(newsListComponent.name, newsListComponent)
    .component(newsViewComponent.name, newsViewComponent);