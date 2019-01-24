import 'angular';
import DocumentsConfig from './documents.config';
import DocumentsListComponent from './components/list/documents-list.component';
import DocumentsMyDocumentsComponent from './components/my-documents/documents-my-documents.component';

angular.module('app.modules.documents', [])
    .config(DocumentsConfig.inst())
    .component(DocumentsListComponent.getName(), DocumentsListComponent)
    .component(DocumentsMyDocumentsComponent.getName(), DocumentsMyDocumentsComponent);