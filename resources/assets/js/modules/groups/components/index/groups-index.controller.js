import ControllerBase from 'base/controller.base';

/**
 * @property {Object} $state
 */
export default class GroupsIndexController extends ControllerBase {

    static get $inject() {
        return ['$state', 'groupsService','$mdDialog','$rootScope'];
    }

    $onInit() {
        this.load();
        this.$rootScope.$on('updateGroups', () => this.load());
    }

    load() {
        return  this.groupsService.all()
            .getList()
            .then((response) => {
                this.groups = response.data;
            });
    }

    editGroup(groupId) {
        this.$state.go('groups.edit',{id:groupId});
    }

    addGroup() {
        this.$state.go('groups.new');
    }

    deleteGroup(groupId) {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this group?`)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.groupsService.deleteGroup(groupId).then(() => {
                 this.$rootScope.$emit('updateGroups');
            });
        });
    }

    beenAdded(id) {
        return (id == 2 || id == 3) ? 0 : 1;
    }
}