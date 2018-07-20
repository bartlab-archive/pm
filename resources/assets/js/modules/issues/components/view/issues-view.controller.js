import ControllerBase from 'base/controller.base';
import angular from 'angular';
// import moment from 'moment';

/**
 * @property {$mdDialog} $mdDialog
 * @property {AttachmentService} attachmentService
 */
export default class IssuesViewController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'attachmentService'];
    }

    $onInit() {
        setTimeout(()=>{
        console.log(this.selectedIssue);
        },1000);
        // todo: add tooltip for icons in left side
    }

    cancel() {
        return this.$mdDialog.cancel();
    }

    download(attachment) {
        if (attachment._progress){
            return false;
        }

        attachment._progress = true;

        this.attachmentService
            .one(attachment.id)
            .then((response) => {
                angular
                    .element('<a>')
                    .attr('download', attachment.filename)
                    .attr('href', 'data:' + attachment.content_type + ';base64,' + response.data.content)[0]
                    .click();
            })
            .finally(()=>{
                attachment._progress = false;
            })
    }
}
