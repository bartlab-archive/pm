import 'angular';
import NewsConfig from './news.config';
import NewsService from './services/news.service';
import NewsEditComponent from './components/edit/news-edit.component';
import NewsListComponent from './components/list/news-list.component';
import NewsViewComponent from './components/view/news-view.component';
import NewsMyLatestComponent from './components/my-latest/news-my-latest.component';

angular.module('app.modules.news', [])
    .config(NewsConfig.inst())
    .service(NewsService.getName(), NewsService)
    .component(NewsEditComponent.getName(), NewsEditComponent)
    .component(NewsListComponent.getName(), NewsListComponent)
    .component(NewsViewComponent.getName(), NewsViewComponent)
    .component(NewsMyLatestComponent.getName(), NewsMyLatestComponent);