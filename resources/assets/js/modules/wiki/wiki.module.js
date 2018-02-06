import 'angular';
import WikiConfig from './wiki.config';
import WikiService from './services/wiki.service';
import wikiProjectSettingsComponent from './components/project-settings/wiki-project-settings.component';
import wikiPageComponent from './components/page/wiki-page.component';
import wikiEditComponent from './components/edit/wiki-edit.component';
import wikiIndexByComponent from './components/index-by/wiki-index-by.component';
import wikiPreviewComponent from './components/preview/wiki-preview.component';

angular.module('app.modules.wiki', [])
    .config(WikiConfig.inst())
    .service('WikiService', WikiService)
    .component(wikiProjectSettingsComponent.name, wikiProjectSettingsComponent)
    .component(wikiPageComponent.name, wikiPageComponent)
    .component(wikiEditComponent.name, wikiEditComponent)
    .component(wikiIndexByComponent.name, wikiIndexByComponent)
    .component(wikiPreviewComponent.name, wikiPreviewComponent);
