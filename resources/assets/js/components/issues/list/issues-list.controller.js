
import ControllerBase from 'base/controller.base';

export default class IssuesListController extends ControllerBase {

    static get $inject() {
        return ['IssuesService', '$stateParams'];
    }

    $onInit() {
        const _this = this;
        _this.IssuesService.getList()
            .then((response) => {
                _this.issues = response.data;
                console.log(_this.issues);
            })
            .catch(console.log);
    }

}