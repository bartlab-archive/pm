import 'angular';
import WikissConfig from './wikis.config';
import WikisService from './services/wikis.service';
import WikisProjectSettingsComponent from './components/project-settings/wikis-project-settings.component';
import WikisPageComponent from './components/page/wikis-page.component';
import WikisFormComponent from './components/form/wikis-form.component';
import WikisHistoryComponent from './components/history/wikis-history.component';
import WikisRenameComponent from './components/rename/wikis-rename.component';
import WikisIndexByComponent from './components/index-by/wikis-index-by.component';
import WikisPreviewComponent from './components/preview/wikis-preview.component';

angular.module('app.modules.wikis', [])
    .config(WikissConfig.inst())
    .service(WikisService.getName(), WikisService)
    .component(WikisProjectSettingsComponent.getName(), WikisProjectSettingsComponent)
    .component(WikisPageComponent.getName(), WikisPageComponent)
    .component(WikisFormComponent.getName(), WikisFormComponent)
    .component(WikisHistoryComponent.getName(), WikisHistoryComponent)
    .component(WikisRenameComponent.getName(), WikisRenameComponent)
    .component(WikisIndexByComponent.getName(), WikisIndexByComponent)
    .component(WikisPreviewComponent.getName(), WikisPreviewComponent);
