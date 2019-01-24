import ControllerBase from 'base/controller.base';

export default class IssuesMyReportedController extends ControllerBase {

    static get $inject() {
        return [];
    }

    $onInit() {
        this.issues = [];
    }

}