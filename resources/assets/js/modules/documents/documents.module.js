import 'angular';
import  DocumentsConfig from './documents.config';
import  documentsListComponent from './components/list/documents-list.component';

angular.module('app.modules.documents', [])
    .config(DocumentsConfig.inst())
    .component(documentsListComponent.name, documentsListComponent);