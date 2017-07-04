import ControllerBase from 'base/controller.base';
// import ngFileSaver from 'angular-file-saver';

/**
 * @property FilesService
 * @property $state
 */
export default class ProjectsFilesController extends ControllerBase {
    static get $inject() {
        return ['FilesService', '$state', '$stateParams', 'FileSaver'];
    }

    $onInit() {
        this.load();
    }

    download(id, name) {
        this.FilesService.getProjectAttachment(id)
            .then((response) => {
                var data = new Blob([response.data], {type: 'application/octet-stream'});
                this.FileSaver.saveAs(data, name);
            });
    }

    delete(id) {
        this.FilesService.delete(id)
            .then(() => {
                this.load();
            });
    }

    load() {
        this.FilesService.getProjectAttachments(this.$stateParams.id)
            .then((response) => {
                this.files = response.data;
            });
    }
}