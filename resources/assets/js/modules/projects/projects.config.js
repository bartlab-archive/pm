import InjectableBase from 'base/injectable.base';
import projectsListComponent from './components/list/projects-list.component';
import projectsNewComponent from './components/new/projects-new.component';
import projectsInfoComponent from './components/info/projects-info.component';
import projectsSettingsComponent from './components/settings/projects-settings.component';
import projectsSettingsInfoComponent from './components/settings-info/projects-settings-info.component';
import projectsSettingsMembersComponent from './components/settings-members/projects-settings-members.component';
import projectsSettingsModulesComponent from './components/settings-modules/projects-settings-modules.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class ProjectsConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'MainServiceProvider','ProjectsServiceProvider'];
    }

    $onInit() {
        this.MainServiceProvider
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

        this.ProjectsServiceProvider
            .registerSettings({
                url: '',
                name: 'Information',
                component: projectsSettingsInfoComponent.name,
            })
            .registerSettings({
                url: 'modules',
                name: 'Modules',
                component: projectsSettingsMembersComponent.name,
            })
            .registerSettings({
                url: 'members',
                name: 'Members',
                component: projectsSettingsModulesComponent.name,
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
                component: projectsNewComponent.name,
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
            .state('projects-admin', {
                url: '/projects',
                data: {
                    isAdmin: true
                },
                parent: 'admin',
                component: projectsListComponent.name,
            });
    }

}