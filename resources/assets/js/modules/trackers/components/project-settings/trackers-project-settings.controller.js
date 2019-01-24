import ControllerBase from 'base/controller.base';

export default class TrackersProjectSettingsController extends ControllerBase {

    static get $inject() {
        return ['$rootScope', '$mdDialog', 'trackersService', 'projectsService', '$mdToast'];
    }

    $onInit() {
        this.trackers = undefined;
        this.load();
    }

    load() {
        this.trackersService
            .state(this.projectsService.getCurrentId())
            .then((response) => {
                this.trackers = response.data.data;
            });
    }

    submit() {
        this.trackersService
            .updateState(
                this.projectsService.getCurrentId(),
                this.trackers.map((tracker) => {
                    return {id: tracker.tracker.id, enable: tracker.enable}
                })
            )
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Successful update.')
                );

                this.trackers = response.data.data;
            });
    }
}