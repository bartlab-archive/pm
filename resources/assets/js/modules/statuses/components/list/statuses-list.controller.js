import ControllerBase from 'base/controller.base';

/**
 * @property {StatusesService} statusesService
 */
export default class StatusesListController extends ControllerBase {

    static get $inject() {
        return ['statusesService'];
    }

    $onInit() {
        return this.statusesService
            .all()
            .then((response) => {
                this.statuses = response.data.data;
            });
    }

    editSatuses(id) {
    }

    deleteSatuses(id) {
    }

}