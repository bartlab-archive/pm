import angular from 'angular';
import * as _ from 'lodash';
import ControllerBase from 'base/controller.base';
import myShowApiKeyComponent from 'components/my/show-api-key/my-show-api-key.component';
import myAddMailComponent from 'components/my/add-mail/my-add-mail.component';
import myChangePasswordComponent from 'components/my/change-password/my-change-password.component';

/**
 * @property {$auth} $auth
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {UsersService} UsersService
 * @property {$mdDialog} $mdDialog
 */
export default class mainMyAccountIndexController extends ControllerBase {

    static get $inject() {
        return ['$auth', '$state', '$mdToast', '$mdDialog', 'UsersService'];
    }

    $onInit() {
        this.user = this.UsersService.getUserInfo().then((response) => {
            if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
                this.model = response.data;
            }
        });

        this.languages = this.UsersService.languages;
        this.timeZone = this.UsersService.timeZone;
    }

    setMdDialogConfig(component, target) {
        let ctrlConfig = [].concat(
            component.controller.$inject || [],
            [(...args) => {
                let ctrl = new component.controller(...args);
                ctrl.$onInit && ctrl.$onInit();
                return ctrl;
            }]
        );

        return {
            controller: ctrlConfig,
            controllerAs: '$ctrl',
            template: component.template,
            panelClass: 'modal-custom-dialog',
            parent: angular.element(document.body),
            trapFocus: true,
            clickOutsideToClose: true,
            clickEscapeToClose: true,
            escapeToClose: true,
            hasBackdrop: true,
            disableParentScroll: true,
            openFrom: target,
            closeTo: target
        }
    }

    changePassword($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myChangePasswordComponent, $event.target)
        );
    }

    showApiKey($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myShowApiKeyComponent, $event.target)
        );
    }

    addEmail($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myAddMailComponent, $event.target)
        );
    }

    resetApiKey() {
        this.UsersService.resetApiAccessKey().then((response) => {
            this.model.api_key_updated_on = response.data;
        });
    }

    resetAtomKey() {
        this.UsersService.resetAtomAccessKey().then((response) => {
            this.model.atom_key_updated_on = response.data;
        });
    }

    submit() {
        this.model.save().then(
            (response) => {
                console.log(response);
                if (response && response.status === 200) {
                    this.mdToast.success();
                }
            }
        );
    }

}