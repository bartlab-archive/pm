import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} usersService
 */
export default class MainRegistrationController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdToast', 'usersService'];
    }

    $onInit() {
        this.languages = this.usersService.getLanguage();

        this.signup = {
            login: '',
            password: '',
            repeatRassword: '',
            firstName: '',
            lastName: '',
            email: '',
            lang: 'en',
            hideEmail: false
        };

        this.errors = {};
        this.form = {};
    }

    submit() {

    }

}
