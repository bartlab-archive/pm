import InjectableBase from 'base/injectable.base';
import DocumentsListComponent from './components/list/documents-list.component';
import DocumentsMyDocumentsComponent from './components/my-documents/documents-my-documents.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class DocumentsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider','myServiceProvider']
    }

    $onInit() {
        this.projectsServiceProvider.registerModule({
            url: 'documents-inner.list',
            title: 'Documents',
            name: 'documents',
            enable: false
        });

        this.myServiceProvider
            .registerModule({
                component: DocumentsMyDocumentsComponent.getName()
            });

        this.$stateProvider
            .state('documents-inner', {
                abstract: true,
                url: '/documents',
                parent: 'projects.inner',
            })
            .state('documents-inner.list', {
                url: '',
                component: DocumentsListComponent.getName(),
            });
    }

}