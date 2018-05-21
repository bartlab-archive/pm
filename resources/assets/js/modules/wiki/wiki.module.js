import 'angular';
import WikiConfig from './wiki.config';
import WikiService from './services/wiki.service';
import WikiProjectSettingsComponent from './components/project-settings/wiki-project-settings.component';
import WikiPageComponent from './components/page/wiki-page.component';
import WikiFormComponent from './components/form/wiki-form.component';
import WikiHistoryComponent from './components/history/wiki-history.component';
import WikiRenameComponent from './components/rename/wiki-rename.component';
import WikiIndexByComponent from './components/index-by/wiki-index-by.component';
import WikiPreviewComponent from './components/preview/wiki-preview.component';

angular.module('app.modules.wiki', [])
    .config(WikiConfig.inst())
    .service(WikiService.getName(), WikiService)
    .component(WikiProjectSettingsComponent.getName(), WikiProjectSettingsComponent)
    .component(WikiPageComponent.getName(), WikiPageComponent)
    .component(WikiFormComponent.getName(), WikiFormComponent)
    .component(WikiHistoryComponent.getName(), WikiHistoryComponent)
    .component(WikiRenameComponent.getName(), WikiRenameComponent)
    .component(WikiIndexByComponent.getName(), WikiIndexByComponent)
    .component(WikiPreviewComponent.getName(), WikiPreviewComponent);
