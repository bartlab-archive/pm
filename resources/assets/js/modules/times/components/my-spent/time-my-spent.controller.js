import ControllerBase from 'base/controller.base';

export default class TimeMySpentController extends ControllerBase {

    static get $inject() {
        return [];
    }

    $onInit() {
        this.issues = [];
    }

}