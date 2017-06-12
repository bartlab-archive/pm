import angular from 'angular';
import * as _ from 'lodash';

import ControllerBase from 'base/controller.base';
import myShowApiKeyComponent from 'components/my/show-api-key/my-show-api-key.component';
import myAddMailComponent from 'components/my/add-mail/my-add-mail.component';
import myChangePasswordComponent from 'components/my/change-password/my-change-password.component';

/**
 * @property $auth
 * @property $state
 * @property $mdToast
 * @property $mdPanel
 * @property UsersService
 *
 * @property user
 * @property languages
 * @property timeZone
 */

export default class mainMyAccountIndexController extends ControllerBase {

    static get $inject() {
        return ['$auth', '$state', '$mdToast', '$mdDialog', '$mdPanel', 'UsersService'];
    }

    $onInit() {
        this.user = this.UsersService.getUserInfo().then((response) => {
            if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
                this.model = response.data;
            }
        });

        this.languages = this.UsersService.getLanguage();
        this.timeZone = this.UsersService.getTimeZone();
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
            parent:angular.element(document.body),
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


    setMdPanelConfig(component, target) {

      let position = this.$mdPanel.newPanelPosition()
          .absolute()
          .center();

      let animation = this.$mdPanel.newPanelAnimation()
          .duration(300)
          .openFrom(target)
          .withAnimation(this.$mdPanel.animation.SCALE);

      let ctrlConfig = [].concat(
        component.controller.$inject || [],
        [(...args) => {
          let ctrl = new component.controller(...args);
          ctrl.$onInit && ctrl.$onInit();
          return ctrl;
        }]
      );

      return {
        animation: animation,
        attachTo: angular.element(document.body),
        controller: ctrlConfig,
        controllerAs: '$ctrl',
        template: component.template,
        panelClass: 'modal-custom-dialog',
        position: position,
        trapFocus: true,
        clickOutsideToClose: true,
        clickEscapeToClose: true,
        escapeToClose: true,
        hasBackdrop: true,
        disableParentScroll: true,
      }
    }


    changePassword($event) {
        this.$mdPanel.open(
            this.setMdPanelConfig(myChangePasswordComponent, $event.target)
        );
    }

    showApiKey($event) {
        this.$mdDialog.show(
            this.setMdDialogConfig(myShowApiKeyComponent, $event.target)
        );
    }

    addEmail($event) {
        this.$mdPanel.open(
            this.setMdPanelConfig(myAddMailComponent, $event.target)
        );
    }

    resetApiKey() {
        this.UsersService.resetApiAccessKey();
    }

    resetAtomKey() {
        this.UsersService.resetAtomAccessKey();
    }

    submit() {
        this.model.save();
    }

}