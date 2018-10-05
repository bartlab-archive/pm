import ControllerBase from 'base/controller.base';

// todo: finish theming loginc

/**
 * @property {object} token
 * @property {MyService} myService
 * @property {StorageService} storageService
 * @property {$mdTheming} $mdTheming
 * @property {$window} $window
 */
export default class MyThemeController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'myService', '$mdTheming', 'storageService', '$window'];
    }

    $onInit() {
        this.theme = this.storageService.getTheme();
        this.list = Object.keys(this.$mdTheming.PALETTES);
    }

    submit() {
        this.storageService.setTheme(this.theme.primary, this.theme.accent, this.theme.warn, this.theme.background);
        this.$window.location.reload();
    }

    reset() {
        this.storageService.resetTheme();
        this.$window.location.reload();
    }
}