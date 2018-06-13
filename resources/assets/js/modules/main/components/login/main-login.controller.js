import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {$mdToast} $mdToast
 * @property {AuthService} authService
 * @property {SettingsService} settingsService
 * @property {$state} $state
 */
export default class MainLoginController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', 'authService', '$state', 'settingsService'];
    }

    $onInit() {
        this.errors = {};
        this.form = {};
        this.model = {
            login: '',
            password: '',
        };
        this.loadProccess = false;

        this.registration = false;
        this.settingsService
            .one('self_registration')
            .then((response) => {
                this.registration = !!_.get(response, 'data.data.value');
            });
    }

    submit() {
        this.loadProccess = true;
        this.authService
            .login({login: this.model.login, password: this.model.password})
            .then((response) => {
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Welcome!')
                );

                this.$state.go('home');
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message).position('bottom left')
                    );
                }

                this.errors = response.data.errors;
            })
            .finally(() => {
                this.loadProccess = false;
            });
    }
}