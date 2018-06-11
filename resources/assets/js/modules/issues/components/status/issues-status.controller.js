import ControllerBase from 'base/controller.base';

/**
 * @property {issuesService} IssuesService
 */
export default class IssuesStatusController extends ControllerBase {

    static get $inject() {
        return ['issuesService'];
    }

    $onInit() {
        return this.issuesService
            .statuses()
            .then((response) => {
                this.statuses = response.data.data;
            });
    }

    editSatuses(id) {
    }

    deleteSatuses(id) {
    }

}