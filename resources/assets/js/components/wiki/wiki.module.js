import 'angular';

import WikiConfig from './wiki.config';
import wikiPageComponent from './page/wiki-page.component';
import wikiEditComponent from './edit/wiki-edit.component';
import wikiIndexByComponent from './index-by/wiki-index-by.component';
import wikiPreviewComponent from './preview/wiki-preview.component';

angular.module('app.components.wiki', [])
    .config(WikiConfig.inst())
    .component(wikiPageComponent.name, wikiPageComponent)
    .component(wikiEditComponent.name, wikiEditComponent)
    .component(wikiIndexByComponent.name, wikiIndexByComponent)
    .component(wikiPreviewComponent.name, wikiPreviewComponent);
