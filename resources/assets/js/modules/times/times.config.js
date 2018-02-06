import InjectableBase from 'base/injectable.base';
import timesListComponent from './components/list/times-list.component';
import timesProjectSettingsComponent from './components/project-settings/times-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} ProjectsServiceProvider
 * @property {object} MainServiceProvider
 */
export default class TimesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'ProjectsServiceProvider', 'MainServiceProvider'];
    }

    $onInit() {
        this.MainServiceProvider
            .registerAppMenu({
                url: 'times.list',
                name: 'Overall spent time',
                icon: 'timelapse'
            });

        this.ProjectsServiceProvider
            .registerSettings({
                url: 'activities',
                name: 'Activities (time tracking)',
                component: timesProjectSettingsComponent.name,
                module: 'time_tracking'
            });

        this.$stateProvider
            .state('times', {
                abstract: true,
                url: '/time_entries',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('times.list', {
                url: '',
                component: timesListComponent.name,
            });
    }

}

