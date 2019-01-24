import ControllerBase from 'base/controller.base';

export default class IssuesMyWatchedController extends ControllerBase {

    static get $inject() {
        return [];
    }

    $onInit() {
        this.issues = [];
    }

}