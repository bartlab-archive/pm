import ControllerBase from 'base/controller.base';

/**
 * @property {FilesService} FilesService
 * @property {$state} $state
 * @property {$stateParams} $stateParams
 * @property {FileSaver} FileSaver
 */
export default class FilesListController extends ControllerBase {

    static get $inject() {
        return ['filesService', '$state', '$stateParams', 'FileSaver'];
    }

    $onInit() {
        // this.load();
    }

    download(id, name) {
        this.filesService.getProjectAttachment(id)
            .then((response) => {
                let data = new Blob([response.data], {type: 'application/octet-stream'});
                this.FileSaver.saveAs(data, name);
            });
    }

    delete(id) {
        this.filesService.delete(id)
            .then(() => {
                this.load();
            });
    }

    load() {
        this.filesService.getProjectAttachments(this.$stateParams.id)
            .then((response) => {
                this.files = response.data;
            });
    }

}