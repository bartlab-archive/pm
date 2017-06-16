import ControllerBase from 'base/controller.base';

export default class IssuesEditController extends ControllerBase{

    static get $inject() {
        return ['IssuesService', '$stateParams'];
    }

    $onInit() {
        const _this = this;
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            _this.issue = response.data;
            _this.issue.statusText = this.statusText(_this.issue.status_id);
        });
    }

    statusText(id){
        switch (id) {
            case 5:
                return 'Closed';
                break;
        }
    }
}