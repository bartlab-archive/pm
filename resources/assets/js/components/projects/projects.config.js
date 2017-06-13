import InjectableBase from 'base/injectable.base';
import projectsListComponent from './list/projects-list.component';
import projectsEditComponent from './edit/projects-edit.component';
import projectsInfoComponent from './info/projects-info.component';

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
            .state('projects-inner', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/projects',
                parent: 'project',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })

            .state('projects.list', {
                url: '',
                component: projectsListComponent.name,
            })
            .state('projects.new', {
                url: '/new',
                component: projectsEditComponent.name,
            })
            .state('projects-inner.info', {
                url: '/:id',
                component: projectsInfoComponent.name,
            });
    }
}