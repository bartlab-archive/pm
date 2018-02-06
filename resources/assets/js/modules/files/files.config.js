import InjectableBase from 'base/injectable.base';
import filesListComponent from './components/list/files-list.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} ProjectsServiceProvider
 * @property {object} MainServiceProvider
 */
export default class FilesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider', 'MainServiceProvider']
    }

    $onInit() {
        this.MainServiceProvider
            .registerNewItemMenu({
                name: 'File',
                url: '',
                icon: 'attach_file',
                module: 'files',
                single: false,
                enable: false
            });

        this.ProjectsServiceProvider.registerModule({
            url: 'files-inner.files',
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
                component: filesListComponent.name,
            });
    }

}