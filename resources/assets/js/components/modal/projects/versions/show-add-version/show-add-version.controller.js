import moment from 'moment';
import ControllerBase from 'base/controller.base';


/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class showAddVersionController extends ControllerBase {
    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope', 'RolesService', 'UsersService'];
    }

    $onInit() {
        this.statuses = this.ProjectsService.getVersionStatuses();
        this.sharings = this.ProjectsService.getVersionSharings();
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    createVersion() {
        this.version.effective_date ?
            this.version.effective_date = moment(this.version.effective_date).format('YYYY-MM-DD') : null;

        this.ProjectsService.createVersion(this.identifier, this.version)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }
}
