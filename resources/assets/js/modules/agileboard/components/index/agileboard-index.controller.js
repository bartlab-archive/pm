import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class AgileboardIndexController extends ControllerBase {

    static get $inject() {
        return ['$state','StatusesService','IssuesService','$stateParams'];
    }


    $onInit() {
        //console.log(this.$stateParams);
        //this.loadProjectIsues();
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
                                    name: item.subject.substr(0, 10),
                                    description: item.description.substr(0,60)
                                });
                            }
                        });

                });
                 // console.log(this.containers);
            });
    }


    loadIsues(){
        // return this.IssuesService.all({
        //     project_identifier: this.currentProjectId()})
        //     .getList()
        //     .then((response) => {
        //         this.list = response.data;
        //         console.log(this.list);
        //
        //     });


        return this.IssuesService.all()
            .getList({
                project_identifier: this.currentProjectId()
            })
            .then((response) => {
                this.list = response.data;
                console.log(this.list);
            });
    }

    toMoved( item ){

    }

    currentProjectId() {
        return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : null;
    }

    // loadProjectIsues(){
    //     return this.IssuesService.all({
    //         project_identifier: this.currentProjectId()})
    //         .getList()
    //         .then((response) => {
    //             this.list = response.data;
    //             console.log(this.list);
    //
    //         });
    // }
}