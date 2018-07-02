import ControllerBase from 'base/controller.base';
import _ from "lodash";

export default class MyPageController extends ControllerBase {

    static get $inject() {
        return ['myService', 'projectsService'];
    }

    $onInit() {
        this.modules = this.myService.getModules().map((e) => {
            e.componentTag = '<' + _.kebabCase(e.component) + '/>';
            // disable module, that need enabled state
            // e.enable = !e.module;

            return e;
        });
    }

}