import ControllerBase from 'base/controller.base';

/**
 * @property ProjectsService
 * @property $state
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', '$state'];
    }

    $onInit() {
        this.showClosed = 0;
        this.load();
    }

    load() {
        // this.list = [];
        this.ProjectsService.getList({closed: this.showClosed}).then((response) => {
            this.list = response.data;
        });
    }

    goto(identifier) {
        this.$state.go('projects-inner.info', {id: identifier});
    }

    newProject(){
        this.$state.go('projects.new');
    }

}