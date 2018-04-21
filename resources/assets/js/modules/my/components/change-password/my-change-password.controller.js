import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$mdDialog} $mdDialog
 * @property {$mdToast} $mdToast
 * @property {UsersService} UsersService
 */
export default class MyChangePasswordController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', 'usersService'];
    }

    $onInit() {
        this.changePasswordForm = {};
        this.errors = {};
    }

    onError(response) {
        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data.errors', {});

            for (let field in this.errors) {
                if (this.changePasswordForm.hasOwnProperty(field)) {
                    this.changePasswordForm[field].$setValidity('server', false);
                }
            }
        }
    }

    change(field) {
        if (this.changePasswordForm.hasOwnProperty(field) && this.errors.hasOwnProperty(field)) {
            this.changePasswordForm[field].$setValidity('server', true);
            this.changePasswordForm[field] = undefined;
        }
    }

    changePassword() {
        this.usersService.changePassword(this.model)
            .then((response) => {
                if (response && response.status === 200) {
                    this.$mdDialog.cancel();
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent('Password Changed Successfully')
                    );
                }
            })
            .catch((response) => this.onError(response));
    }

}
