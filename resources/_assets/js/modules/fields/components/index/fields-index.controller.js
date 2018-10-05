import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class FieldsIndexController extends ControllerBase {

    static get $inject() {
        return ['$state', 'fieldsService'];
    }

    $onInit() {
        // return  this.fieldsService.all()
        //     .getList()
        //     .then((response) => {
        //         this.custom_fields = response.data;
        //     });
    }

    // editFields(id){}
    // deleteFields(id){}

}