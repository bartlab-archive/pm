import ControllerBase from 'base/controller.base';

/**
 * @property FilesService
 * @property $state
 */
export default class ProjectsFilesController extends ControllerBase {
    static get $inject() {
        return ['FilesService', '$state', '$stateParams'];
    }

    $onInit() {
        this.load();
    }
    
    load(){
        this.FilesService.getProjectAttachments(this.$stateParams.id).then((response) => {
            this.files = response.data;
        });
    }
}