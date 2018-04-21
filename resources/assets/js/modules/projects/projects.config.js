import InjectableBase from 'base/injectable.base';
import ProjectsListComponent from './components/list/projects-list.component';
import ProjectsNewComponent from './components/new/projects-new.component';
import ProjectsInfoComponent from './components/info/projects-info.component';
import ProjectsSettingsComponent from './components/settings/projects-settings.component';
import ProjectsSettingsInfoComponent from './components/settings-info/projects-settings-info.component';
import ProjectsSettingsMembersComponent from './components/settings-members/projects-settings-members.component';
import ProjectsSettingsModulesComponent from './components/settings-modules/projects-settings-modules.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class ProjectsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider', 'projectsServiceProvider'];
    }

    $onInit() {
        this.mainServiceProvider
            .registerAdminMenu({
                name: 'Projects',
                url: 'projects-admin',
                icon: 'work'
            })
            .registerAppMenu({
                url: 'projects.list',
                name: 'Projects',
                icon: 'work'
            })
            .registerNewItemMenu({
                name: 'Version',
                url: '',
                icon: 'archive',
                single: false,
                enable: false
            })
            .registerNewItemMenu({
                name: 'Project',
                url: 'projects.new',
                icon: 'work',
                single: true,
                enable: false
            });

        this.projectsServiceProvider
            .registerSettings({
                url: '',
                name: 'Information',
                component: ProjectsSettingsInfoComponent.getName(),
            })
            .registerSettings({
                url: 'modules',
                name: 'Modules',
                component: ProjectsSettingsModulesComponent.getName(),
            })
            .registerSettings({
                url: 'members',
                name: 'Members',
                component: ProjectsSettingsMembersComponent.getName(),
            });

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
            })
            .state('projects.inner.copy', {
                url: '/copy',
                component: ProjectsNewComponent.getName(),
            })
            .state('projects.list', {
                url: '',
                component: ProjectsListComponent.getName(),
            })
            .state('projects.new', {
                url: '/new',
                component: ProjectsNewComponent.getName(),
            })
            .state('projects.inner.info', {
                url: '',
                component: ProjectsInfoComponent.getName(),
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
                component: ProjectsSettingsComponent.getName(),
            })
            .state('projects-admin', {
                url: '/projects',
                data: {
                    isAdmin: true
                },
                parent: 'admin',
                component: ProjectsListComponent.getName(),
            });
    }

}