import InjectableBase from 'base/injectable.base';
import TrackersIndexComponent from './components/index/trackers-index.component';
import TrackersProjectSettingsComponent from './components/project-settings/trackers-project-settings.component';

/**
 * @property {$stateProvider} $stateProvider
 * @property {object} MainServiceProvider
 */
export default class TrackersConfig extends InjectableBase {

    static get $inject() {
        return ['$stateProvider', 'mainServiceProvider', 'projectsServiceProvider']
    }

    $onInit() {
        this.main();
        this.projects();
        this.states();
    }

    states() {
        this.$stateProvider
            .state('trackers', {
                abstract: true,
                data: {
                    access: '!'
                },
                url: '/trackers',
                parent: 'default',
                views: {
                    content: {
                        template: '<ui-view/>'
                    }
                }
            })
            .state('trackers.index', {
                url: '',
                component: TrackersIndexComponent.getName(),
            });
    }

    main() {
        this.mainServiceProvider
            .registerAdminMenu({
                name: 'Trackers',
                url: 'trackers.index',
                icon: 'timelapse'
            });
    }

    projects() {
        this.projectsServiceProvider
            .registerSettings({
                url: 'trackers',
                name: 'Trackers',
                component: TrackersProjectSettingsComponent.getName(),
                module: 'issue_tracking'
            });
    }

}