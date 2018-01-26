import ControllerBase from 'base/controller.base';
import issuesViewModalController from 'modules/issues/components/view-modal/issues-view-modal.controller';
import issuesViewModalTemplate from 'modules/issues/components/view-modal/issues-view-modal.html';

/**
 * @property {Object} $state
 */
export default class AgileIndexController extends ControllerBase {

    static get $inject() {
        return ['$state','StatusesService','IssuesService','$stateParams','$mdDialog'];
    }

    $onInit() {

        this.loadIsues().then(() => this.load());

    }

    load() {
        return  this.StatusesService.all()
            .getList()
            .then((response) => {
                this.containers = response.data;
                _.forEach(this.containers, (container, key) => {
                    container.items = [];
                    _.forEach(this.list, (item, key) => {

                        if (container.id == item.status.id) {
                            container.items.push({
                                id:item.id,
                                subject: item.subject,
                                description: item.description  //.substr(0,60)
                            });
                        }
                    });

                });
                //console.log(this.containers);
            });
    }

    viewIssue($event, issue) {
        console.log(issue);
        this.$mdDialog.show(
            this.constructor.setMdDialogConfig($event.target, {
                selectedIssue: issue
            })
        );

    }

    static setMdDialogConfig(target, data = {}) {
        return {
            controller: issuesViewModalController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: data,
            template: issuesViewModalTemplate,
            clickOutsideToClose: true,
            openFrom: target,
            closeTo: target,
        };
    }

    loadIsues(){
        return this.IssuesService.all()
            .getList({
                project_identifier: this.currentProjectId()
            })
            .then((response) => {
                this.list = response.data;
                console.log(this.list);
            });
    }

    currentProjectId() {
        return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : null;
    }


    toMoved( item ){

    }

}