import ControllerBase from 'base/controller.base';

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
                                id: item.id,
                                subject: item.subject,
                                author: item.author.firstname + ' ' + item.author.lastname,
                                start_date: item.start_date ? item.start_date : 'not set',
                                due_date: item.due_date ?  item.due_date : 'not set' ,
                                assigned: item.assigned ? item.assigned && item.assigned.firstname  + ' ' + item.assigned.lastname : 'not assigned',
                                //description: item.description  //.substr(0,60)
                            });
                        }
                    });

                });
            });
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