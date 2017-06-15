import InjectableBase from 'base/injectable.base';
import projectsListComponent from './list/projects-list.component';
import projectsNewComponent from './new/projects-new.component';
import projectsInfoComponent from './info/projects-info.component';
import projectsSettingsComponent from './settings/projects-settings.component';
import projectsActivityComponent from './activity/projects-activity.component';
import projectsCalendarComponent from './calendar/projects-calendar.component';
import projectsIssuesComponent from './issues/projects-issues.component';
import projectsWikiComponent from './wiki/projects-wiki.component';
import projectsGanttComponent from './gantt/projects-gantt.component';
import projectsNewsComponent from './news/projects-news.component';
import projectsDocumentsComponent from './documents/projects-documents.component';
import projectsFilesComponent from './files/projects-files.component';
import projectsBoardsComponent from './boards/projects-boards.component';

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
                url: '/projects/{id:[a-z][a-z0-9\-\_]{0,99}}',
                parent: 'project',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('projects-inner.issues', {
                abstract: true,
                url: '/issues',
            })

            .state('projects.list', {
                url: '',
                component: projectsListComponent.name,
            })
            .state('projects-inner.info', {
                url: '',
                component: projectsInfoComponent.name,
            })
            .state('projects-inner.settings', {
                url: '/settings',
                component: projectsSettingsComponent.name,
            })
            .state('projects-inner.activity', {
                url: '/activity',
                component: projectsActivityComponent.name,
            })
            .state('projects-inner.issues.index', {
                url: '',
                component: projectsIssuesComponent.name,
            })
            .state('projects-inner.issues.calendar', {
                url: '/calendar',
                component: projectsCalendarComponent.name,
            })
            .state('projects-inner.issues.gantt', {
                url: '/gantt',
                component: projectsGanttComponent.name,
            })
            .state('projects-inner.wiki', {
                url: '/wiki',
                component: projectsWikiComponent.name,
            })
            .state('projects-inner.news', {
                url: '/news',
                component: projectsNewsComponent.name,
            })
            .state('projects-inner.documents', {
                url: '/documents',
                component: projectsDocumentsComponent.name,
            })
            .state('projects-inner.files', {
                url: '/files',
                component: projectsFilesComponent.name,
            })
            .state('projects-inner.boards', {
                url: '/boards',
                component: projectsBoardsComponent.name,
            })
            .state('projects.new', {
                url: '/new',
                component: projectsNewComponent.name,
                url: '/:id',
                component: 'projectsInfoComponent',
            })
            .state('projects-inner.issues', {
                url: '/:id/issues',
                component: 'projectsIssuesComponent',
            });
    }
}