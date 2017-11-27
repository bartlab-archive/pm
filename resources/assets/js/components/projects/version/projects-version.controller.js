import ControllerBase from 'base/controller.base';
import moment from 'moment';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class ProjectsVersionController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', '$mdToast', 'ProjectsService', '$rootScope', 'RolesService', 'UsersService'];
    }

    $onInit() {
        this.statuses = this.ProjectsService.getVersionStatuses();
        this.sharings = this.ProjectsService.getVersionSharings();
    }

    cancel(update) {
        this.$mdDialog.cancel();

        if (update) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Success saved!').position('bottom left')
            );
            this.$rootScope.$emit('updateProjectInfo');
        }
    }

    submit() {
        this.version.effective_date ?
            this.version.effective_date = moment(this.version.effective_date).format('YYYY-MM-DD') : null;

        if (!this.version.id) {
            this.ProjectsService
                .createVersion(this.identifier, this.version)
                .then(() => this.cancel(true));
        } else {
            this.ProjectsService
                .editVersion(this.version.id, this.version)
                .then(() => this.cancel(true));
        }
    }

}
