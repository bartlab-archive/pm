import InjectableBase from 'base/injectable.base';
import TimesListComponent from './components/list/times-list.component';
import TimesProjectSettingsComponent from './components/project-settings/times-project-settings.component';
import TimeMySpentComponent from './components/my-spent/time-my-spent.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} ProjectsServiceProvider
 * @property {object} MainServiceProvider
 */
export default class TimesConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'projectsServiceProvider', 'mainServiceProvider','myServiceProvider'];
    }

    $onInit() {
        this.mainServiceProvider
            .registerAppMenu({
                url: 'times.list',
                name: 'Overall spent time',
                icon: 'timelapse'
            });

        this.projectsServiceProvider
            .registerSettings({
                url: 'activities',
                name: 'Activities (time tracking)',
                component: TimesProjectSettingsComponent.getName(),
                module: 'time_tracking'
            });

        this.myServiceProvider
            .registerModule({
                component: TimeMySpentComponent.getName()
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
                component: TimesListComponent.getName(),
            });
    }

}

