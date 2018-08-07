import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class EnumerationsIndexController extends ControllerBase {

    static get $inject() {
        return ['$state', 'enumerationsService'];
    }

    $onInit() {

       // this.enumerationsService.all()
       //      .getList({type:'TimeEntryActivity'})
       //      .then((response) => {
       //          this.timeEntryActivity = response.data;
       //      });
       //
       // this.enumerationsService.all()
       //      .getList({type:'IssuePriority'})
       //      .then((response) => {
       //          this.issuePriority = response.data;
       // });
       //
       // this.enumerationsService.all()
       //      .getList({type:'DocumentCategory'})
       //      .then((response) => {
       //          this.documentCategory = response.data;
       // });
    }

}