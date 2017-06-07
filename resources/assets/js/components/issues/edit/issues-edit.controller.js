import ControllerBase from 'base/controller.base';

export default class IssuesEditController extends ControllerBase{

    static get $inject() {
        return ['IssuesService', '$stateParams'];
    }

    $onInit() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            this.issues = response.data;
        });
    }

}