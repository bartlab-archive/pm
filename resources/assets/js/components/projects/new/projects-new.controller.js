import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 */
export default class ProjectsNewController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService'];
    }

    $onInit() {
        this.modules = this.ProjectsService.modules;

        this.trackers = [
            {id: '4', name: 'Feature'},
            {id: '6', name: 'Bug'},
        ];

        this.ProjectsService.getList().then((response) => {
            this.projects = response.data;
        });
    }

    submit() {
        // this.ProjectsService.create(this.model).then((response) => {
        //     console.log(response);
        // });
    }
}