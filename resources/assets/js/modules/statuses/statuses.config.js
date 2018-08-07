import InjectableBase from 'base/injectable.base';
import StatusesListComponent from './components/list/statuses-list.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {ProjectsServiceProvider} projectsServiceProvider
 * @property {MainServiceProvider} mainServiceProvider
 */
export default class StatusesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider', 'mainServiceProvider'];
    }

    $onInit() {
        this.main();
        this.states();
    }

    main() {
        this.mainServiceProvider
            .registerAdminMenu({
                name: 'Issue statuses',
                url: 'issues-statuses.index',
                icon: 'done'
            });
    }

    states() {
        this.$stateProvider
            .state('issues-statuses', {
                abstract: true,
                data: {
                    access: '!'
                },
                url: '/issue_statuses',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('issues-statuses.index', {
                url: '',
                component: StatusesListComponent.getName(),
            });
    }
}

