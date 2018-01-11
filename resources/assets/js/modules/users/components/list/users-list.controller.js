import ControllerBase from 'base/controller.base';

/**
 * @property {UsersService} UsersService
 * @property {$state} $state
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return ['UsersService','$state', '$rootScope', '$mdDialog'];
    }

    $onInit() {
        // this.showClosed = 0;
        this.load();
        this.statuses =  { 1:'Active',2:'Register', 3:'Lock'};
        this.$rootScope.$on('updateUsers', () => this.load());
    }

    load() {
        this.list = [];
        this.UsersService.getList().then((response) => {
            this.list = response.data;
        });

    }

    goto(userId) {
        this.$state.go('users.info', {id: userId});
    }

    lockUser(userId, status) {
        let confirm = this.$mdDialog.confirm()
            .title(status == '3' ? 'Would you like to unlock this user?':'Would you like to lock this user?' )
            .ok( status == '3' ?'unlock':'lock' )
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            if (status == 3) {
                status = 1;
            } else {
                status = 3;
            }
            this.UsersService.updateUserStatus(userId, {'status': status}).then((response) => {
                this.$rootScope.$emit('updateUsers');
            });
        });

    }

    sortBy() {
        this.UsersService.getList({status: this.filterForm.myOption}).then((response) => {
            this.list = response.data;
        });
    }

    clearFilters(){
        this.filterForm.myOption = 0;
        this.filterForm.text = '';
        this.$rootScope.$emit('updateUsers');
    }

    deleteUser(userId) {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this user?`)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.UsersService.deleteUser(userId).then(() => {
                this.$rootScope.$emit('updateUsers');
            });
        });
    }
}