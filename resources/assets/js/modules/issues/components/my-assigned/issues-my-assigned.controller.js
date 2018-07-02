import ControllerBase from 'base/controller.base';

export default class IssuesMyAssignedController extends ControllerBase {

    static get $inject() {
        return [];
    }

    $onInit() {
        this.issues = [];
    }

}