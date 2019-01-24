import InjectableBase from 'base/injectable.base';
import FilesListComponent from './components/list/files-list.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} ProjectsServiceProvider
 * @property {object} MainServiceProvider
 */
export default class FilesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider', 'mainServiceProvider']
    }

    $onInit() {
        this.mainServiceProvider
            .registerNewItemMenu({
                name: 'File',
                url: '',
                icon: 'attach_file',
                module: 'files',
                single: false,
                enable: false
            });

        this.projectsServiceProvider
            .registerModule({
                url: 'files-inner.list',
                title: 'Files',
                name: 'files',
                enable: false
            });

        this.$stateProvider
            .state('files-inner', {
                abstract: true,
                url: '/files',
                parent: 'projects.inner',
            })
            .state('files-inner.list', {
                url: '',
                component: FilesListComponent.getName(),
            });
    }

}