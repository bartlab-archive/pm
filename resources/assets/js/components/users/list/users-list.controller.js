import ControllerBase from 'base/controller.base';

/**
 * @property {UsersService} UsersService
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return ['UsersService'];
    }

    $onInit() {
        // this.showClosed = 0;
        this.load();
    }

    load() {
        this.list = [];
        this.UsersService.getList({closed: this.showClosed}).then((response) => {
            this.list = response.data;
        });
    }

}