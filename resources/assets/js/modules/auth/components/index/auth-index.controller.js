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
                this.groups = response.data;
            });
    }
}