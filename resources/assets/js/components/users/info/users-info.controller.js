import ControllerBase from 'base/controller.base';

/**
 * @property {UsersService} UsersService
 * @property {$stateParams} $stateParams
 */
export default class UsersInfoController extends ControllerBase {

    static get $inject() {
        return ['UsersService', '$stateParams'];
    }

    $onInit() {
        this.UsersService.one(this.$stateParams.id).then((response) => {
            this.project = response.data;
        });
    }

}