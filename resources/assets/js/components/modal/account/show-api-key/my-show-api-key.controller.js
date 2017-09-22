import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property {UserService} UserService
 * @property {$mdDialog} $mdDialog
 */
export default class myShowApiKeyController extends ControllerBase {

    static get $inject() {
        return ['UsersService', '$mdDialog'];
    }

    $onInit() {
        this.UsersService.getApiAccessKey().then((result) => {
            this.apiKey = _.get(result, 'data.value');
        });

    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
