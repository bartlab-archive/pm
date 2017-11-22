import 'angular';

import NewsConfig from './news.config';
import newsEditComponent from './edit/news-edit.component';
import newsListComponent from './list/news-list.component';
import newsViewComponent from './view/news-view.component';

angular.module('app.components.news', [])
    .config(NewsConfig.inst())
    .component(newsEditComponent.name, newsEditComponent)
    .component(newsListComponent.name, newsListComponent)
    .component(newsViewComponent.name, newsViewComponent);