import 'angular';

import NewsConfig from './news.config';
import newsEditComponent from './edit/news-edit.component';
import newsListComponent from './list/news-list.component';

angular.module('app.components.news', [])
    .config(NewsConfig)
    .component('newsEditComponent', newsEditComponent)
    .component('newsListComponent',  newsListComponent);