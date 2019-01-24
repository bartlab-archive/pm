import InjectableBase from 'base/injectable.base';
import VersionsInfoComponent from './components/info/versions-info.component';
import VersionsProjectSettingsComponent from './components/project-settings/versions-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class VersionsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider'];
    }

    $onInit() {
        this.projectsServiceProvider
            .registerSettings({
                url: 'versions',
                name: 'Versions',
                component: VersionsProjectSettingsComponent.getName(),
            });

        this.$stateProvider
            .state('versions', {
                abstract: true,
                data: {
                    access: '!'
                },
                url: '/versions',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('versions.info', {
                url: '/:id',
                component: VersionsInfoComponent.getName(),
            })

    }

}

