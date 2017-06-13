import ControllerBase from 'base/controller.base';

export default class IssuesEditController extends ControllerBase{

    static get $inject() {
        return ['IssuesService', '$stateParams'];
    }

    $onInit() {
        const _this = this;
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            _this.issue = response.data;
        });
    }

}