import _ from 'lodash';
import ControllerBase from 'base/controller.base';


/**
 * @property {$mdDialog} $mdDialog
 * @property {ProjectsService} ProjectsService
 * @property {$rootScope} $rootScope
 * @property {RolesService} RolesService
 * @property {UsersService} UsersService
 */
export default class showAddMemberController extends ControllerBase {
    static get $inject() {
        return ['$mdDialog', 'ProjectsService', '$rootScope', 'RolesService', 'UsersService'];
    }

    $onInit() {
        this.RolesService.getList({
            builtin: 0
        }).then((response) => {
            this.roles = _.map(response.data, item => {
                return _.pick(item, ['id', 'name']);
            });
        });

        this.currentMembers === 'undefined' ? this.currentMembers = [] : null;

        this.UsersService.getList().then((response) => {
            this.users = this.getNewUsers(response.data);
        });

        this.member = {
            user_id: null,
            role_id: null
        };
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    getNewUsers(data) {
        let users = [], self = this;
        _.each(data, (v, k) => {
            if (!_.includes(self.currentMembers, v.id)) {
                users.push(_.pick(v, ['id', 'firstname', 'lastname']));
            }
        });

        return users;
    }

    addMember() {
        this.ProjectsService.createMember(this.identifier, this.member)
            .then(() => {
                this.$mdDialog.cancel();
                this.$rootScope.$emit('updateProjectInfo');
            });
    }
}
