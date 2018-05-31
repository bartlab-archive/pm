import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class AuthIndexController extends ControllerBase {

    static get $inject() {
        return ['$state'];
    }

    $onInit() {
        return  this.groupsService.all()
            .getList()
            .then((response) => {
                // todo: is it correct to access via response.data ? (usually response.data.data)
                // check is it array or object, of array - use _.merge
                this.groups = response.data; response.data;
            });
    }
}