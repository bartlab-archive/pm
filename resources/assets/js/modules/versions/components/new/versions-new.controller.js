import ControllerBase from 'base/controller.base';
import moment from 'moment';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class VersionsNewController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', 'projectsService', '$rootScope', 'rolesService', 'usersService'];
    }

    $onInit() {
        // if project identifier not set - close dialog
        if (!this.identifier) {
            this.cancel();
        }

        this.statuses = this.projectsService.getVersionStatuses();
        this.sharings = this.projectsService.getVersionSharings();
    }

    cancel(update) {
        this.$mdDialog.cancel();

        if (update) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Success saved!')//.position('bottom left')
            );
            this.$rootScope.$emit('updateProjectInfo');
        }
    }

    submit() {
        this.version.effective_date ?
            this.version.effective_date = moment(this.version.effective_date).format('YYYY-MM-DD') : null;

        if (!this.version.id) {
            this.projectsService
                .createVersion(this.identifier, this.version)
                .then(() => this.cancel(true));
        } else {
            this.projectsService
                .editVersion(this.version.id, this.version)
                .then(() => this.cancel(true));
        }
    }

}
