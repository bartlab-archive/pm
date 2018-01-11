import InjectableBase from 'base/injectable.base';
import versionsInfoComponent from './components/info/versions-info.component';

/**
 * @property {$stateProvider} $stateProvider
 */
export default class VersionsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider'];
    }

    $onInit() {
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

