import ControllerBase from 'base/controller.base';

/**
 * @property ProjectsService
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService'];
    }

    $onInit() {
        // this.showClosed = 0;
        this.load();
    }

    load() {
        this.list = [];
        this.ProjectsService.getList({closed: this.showClosed}).then((response) => {
            this.list = response.data;
        });
    }

}