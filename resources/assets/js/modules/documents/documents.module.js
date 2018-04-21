import 'angular';
import DocumentsConfig from './documents.config';
import DocumentsListComponent from './components/list/documents-list.component';

angular.module('app.modules.documents', [])
    .config(DocumentsConfig.inst())
    .component(DocumentsListComponent.getName(), DocumentsListComponent);