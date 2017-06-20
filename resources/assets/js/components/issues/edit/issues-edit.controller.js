import ControllerBase from 'base/controller.base';

export default class IssuesEditController extends ControllerBase{

    static get $inject() {
        return ['IssuesService', '$stateParams'];
    }

    $onInit() {
        this.IssuesService.one(this.$stateParams.id).then((response) => {
            this.issue = response.data;
            this.issue.statusText = this.statusText(this.issue.status_id);
            this.edit_issue = this.issue;
            console.log(this.issue);
        });
    }

    statusText(id){
        switch (id) {
            case 5:
                return 'Closed';
                break;
        }
    }

    openEditForm(){
        this.editIsOpen = true;
    }

    updateIssue(){
        console.log(this.issue);
        this.IssueService.update(this.$stateParams.id, this.edit_issue).then((response) => {
            console.log(response);
        })
    }

}