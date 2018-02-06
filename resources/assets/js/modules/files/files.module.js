import 'angular';
import FilesConfig from './files.config';
import FilesService from './services/files.service';
import filesListComponent from './components/list/files-list.component';

angular.module('app.modules.files', [])
    .config(FilesConfig.inst())
    .service('FilesService', FilesService)
    .component(filesListComponent.name, filesListComponent);