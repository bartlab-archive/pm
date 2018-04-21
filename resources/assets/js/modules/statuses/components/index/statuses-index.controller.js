import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class StatusesIndexController extends ControllerBase {

    static get $inject() {
        return ['$state', 'statusesService'];
    }

    $onInit() {
        return  this.statusesService.all()
            .getList()
            .then((response) => {
                this.statuses = response.data;
            });
    }

    editSatuses(id){}
    deleteSatuses(id){}

}