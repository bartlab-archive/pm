import 'angular';
import FilesConfig from './files.config';
import FilesService from './services/files.service';
import FilesListComponent from './components/list/files-list.component';

angular.module('app.modules.files', [])
    .config(FilesConfig.inst())
    .service(FilesService.getName(), FilesService)
    .component(FilesListComponent.getName(), FilesListComponent);