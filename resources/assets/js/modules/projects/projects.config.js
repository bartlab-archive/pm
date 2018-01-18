import InjectableBase from 'base/injectable.base';
import projectsListComponent from './components/list/projects-list.component';
import projectsNewComponent from './components/new/projects-new.component';
import projectsInfoComponent from './components/info/projects-info.component';
import projectsSettingsComponent from './components/settings/projects-settings.component';
import projectsActivityComponent from './components/activity/projects-activity.component';
import projectsCalendarComponent from './components/calendar/projects-calendar.component';
import projectsGanttComponent from './components/gantt/projects-gantt.component';
import projectsNewsComponent from './components/news/projects-news.component';
import projectsDocumentsComponent from './components/documents/projects-documents.component';
import projectsFilesComponent from './components/files/projects-files.component';
import projectsBoardsComponent from './components/boards/projects-boards.component';
import projectsRepositoryComponent from './components/repository/projects-repository.component';
import agileboardIndexComponent from './components/agileboard/agileboard-index.component';

/**
 * @property {$stateProvider} $stateProvider
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
            .state('projects.inner', {
                abstract: true,
                data: {
                    access: '@'
                },
                url: '/{project_id:[a-z][a-z0-9\-\_]{0,99}}',
                template: '<ui-view/>'
                // views: {
                //     content: {
                //         template: '<ui-view/>'
                //     }
                // }
            })
            .state('projects.inner.copy', {
                url: '/copy',
                component: projectsNewComponent.name,
            })
            .state('projects.inner.issues', {
                abstract: true,
                url: '/issues',
            })
            .state('projects.inner.issues.new', {
                url: '/new',
                component: 'issuesNewComponent'
            })
            .state('projects.list', {
                url: '',
                component: projectsListComponent.name,
            })
            .state('projects.new', {
                url: '/new',
                component: projectsNewComponent.name,
            })
            .state('projects.inner.info', {
                url: '',
                component: projectsInfoComponent.name,
            })
            .state('projects.inner.settings', {
                url: '/settings/{page}',
                params: {
                    page: {
                        value: null,
                        squash: true,
                        dynamic: true
                    }
                },
                component: projectsSettingsComponent.name,
            })
            .state('projects.inner.activity', {
            url: '/activity',
            component: projectsActivityComponent.name,
            })
            .state('projects.inner.activity.date', {
                url: '/activity/:end_date',
                component: projectsActivityComponent.name,
            })
            // .state('projects.inner.issues.index', {
            //     url: '',
            //     component: issuesListComponent.name,
            // })
            .state('projects.inner.issues.agileboard', {
                url: '/agile',
                component: agileboardIndexComponent.name,
            })
            .state('projects.inner.issues.calendar', {
                url: '/calendar',
                component: projectsCalendarComponent.name,
            })
            .state('projects.inner.issues.gantt', {
                url: '/gantt',
                component: projectsGanttComponent.name,
            })
            .state('projects.inner.news', {
                url: '/news',
                component: projectsNewsComponent.name,
            })
            .state('projects.inner.documents', {
                url: '/documents',
                component: projectsDocumentsComponent.name,
            })
            .state('projects.inner.files', {
                url: '/files',
                component: projectsFilesComponent.name,
            })
            .state('projects.inner.repository', {
                url: '/repository',
                component: projectsRepositoryComponent.name,
            })
            .state('projects.inner.boards', {
                url: '/boards',
                // url: '/boards/{id:[0-9]}',
                component: projectsBoardsComponent.name,
            });
    }

}