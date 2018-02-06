import InjectableBase from 'base/injectable.base';
import documentsListComponent from './components/list/documents-list.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class DocumentsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider']
    }

    $onInit() {
        this.ProjectsServiceProvider.registerModule({
            url: 'documents-inner.list',
            title: 'Documents',
            name: 'documents',
            enable: false
        });

        this.$stateProvider
            .state('documents-inner', {
                abstract: true,
                url: '/documents',
                parent: 'projects.inner',
            })
            .state('documents-inner.list', {
                url: '',
                component: documentsListComponent.name,
            });
    }

}