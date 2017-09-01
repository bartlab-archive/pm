// import _ from 'lodash';
import ControllerBase from 'base/controller.base';

/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 UsersService */
export default class showEditMemberController extends ControllerBase {

    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope', 'RolesService'];
    }

    $onInit() {
        this.RolesService.getList({
            builtin: 0
        }).then((response) => {
            this.roles = _.map(response.data, (item) => {
                return _.pick(item, ['id', 'name']);
            });
        });

        this.role = {
            role_id: null
        };
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    updateMember() {
        this.ProjectsService.updateMember(this.memberId, this.role)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }
}
