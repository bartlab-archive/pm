import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property UserService
 * @property apiKey
 */
export default class myShowApiKeyController extends ControllerBase {

    static get $inject() {
        return ['UsersService'];
    }

    // constructor(...args){
    //     super(...args);
    //
    //     this.$onInit();
    // }

    $onInit() {
        this.UsersService.getApiAccessKey().then((result) => {
            this.apiKey = _.get(result, 'data.api_key');
        });

    }
}
