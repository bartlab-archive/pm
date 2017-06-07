import InjectableBase from 'base/injectable.base';

/**
 * Class ProjectsConfig
 *
 * @property $stateProvider
 */
export default class ProjectsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider'];
    }

    $onInit() {
        this.$stateProvider
            .state('projects', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/projects',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('projects.list', {
                url: '',
                component: 'projectsListComponent',
            })
            .state('projects.new', {
                url: '/new',
                component: 'projectsEditComponent',
            })
            .state('projects.info', {
                url: '/:id',
                component: 'projectsInfoComponent',
            });
    }
}