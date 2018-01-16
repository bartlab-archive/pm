import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class TrackersIndexController extends ControllerBase {

    static get $inject() {
        return ['$state', 'TrackersService'];
    }

    $onInit() {
        return  this.TrackersService.all()
            .getList()
            .then((response) => {
                this.trackers = response.data;
            });
    }

    editTracker(id){}
    deleteTracker(id){}
}