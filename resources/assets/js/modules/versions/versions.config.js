import InjectableBase from 'base/injectable.base';
import versionsInfoComponent from './components/info/versions-info.component';
import versionsProjectSettingsComponent from './components/project-settings/versions-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class VersionsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider'];
    }

    $onInit() {
        this.ProjectsServiceProvider
            .registerSettings({
                url: 'versions',
                name: 'Versions',
                component: versionsProjectSettingsComponent.name,
            });

        this.$stateProvider
            .state('versions', {
                abstract: true,
                data: {
                    access: '@'
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
                component: versionsInfoComponent.name,
            })

    }

}

