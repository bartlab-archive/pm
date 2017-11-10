import _ from 'lodash';
import moment from 'moment';
import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class showEditVersionController extends ControllerBase {
    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope', 'RolesService', 'UsersService'];
    }

    $onInit() {
        this.statuses = this.ProjectsService.getVersionStatuses();
        this.sharings = this.ProjectsService.getVersionSharings();

        this.initailVersion = _.clone(this.version);
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    editVersion() {
        this.version.effective_date ?
            this.version.effective_date = moment(this.version.effective_date).format('YYYY-MM-DD') : null;

        this.ProjectsService.editVersion(this.version.id, this.version)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }

    isDisabledSaveBtn() {
        if (!this.version.name) {
            return true;
        }

        return _.isEqual(this.initailVersion, this.version);
    }
}
