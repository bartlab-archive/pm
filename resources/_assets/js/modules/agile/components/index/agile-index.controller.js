import ControllerBase from 'base/controller.base';
import issuesViewModalController from 'modules/issues/components/view-modal/issues-view-modal.controller';
import issuesViewModalTemplate from 'modules/issues/components/view-modal/issues-view-modal.html';

/**
 * @property {Object} $state
 */
export default class AgileIndexController extends ControllerBase {

    static get $inject() {
        return ['$state','statusesService','issuesService','$stateParams','$mdDialog','projectsService'];
    }

    $onInit() {
        this.loadIsues().then(() => this.load());
    }

    load() {
        return  this.statusesService.all()
            .getList()
            .then((response) => {
                this.containers = response.data;
                _.forEach(this.containers, (container, key) => {
                    container.items = [];
                    _.forEach(this.list, (item, key) => {
                        if(item.id) {
                            if (container.id == item.status.id) {
                                container.items.push({
                                    id: item.id,
                                    subject: item.subject,
                                    author: item.author ? item.author.firstname + ' ' + item.author.lastname : ' ' ,
                                    start_date: item.start_date ? item.start_date : 'not set',
                                    due_date: item.due_date ?  item.due_date : 'not set' ,
                                    assigned: item.assigned ? item.assigned && item.assigned.firstname  + ' ' + item.assigned.lastname : 'not assigned',
                                    data: item
                                    //description: item.description  //.substr(0,60)
                                });
                            }
                        }
                    });
                });
            });
    }

    loadIsues(){
        return this.issuesService.all()
            .getList({
                project_identifier: this.projectsService.getCurrentId()
            })
            .then((response) => {
                this.list = response.data;
            });
    }

    // currentProjectId() {
    //     return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : null;
    // }

    toMoved(item){
    }

    viewIssue($event, issue) {
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
}