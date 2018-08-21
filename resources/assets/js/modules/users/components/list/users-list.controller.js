import ControllerBase from 'base/controller.base';

/**
 * @property {UsersService} usersService
 * @property {$state} $state
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return ['usersService', '$state', '$rootScope', '$mdDialog', '$mdToast',
            'USER_STATUS_ACTIVE', 'USER_STATUS_DISABLE', 'USER_STATUS_LOCK'];
    }

    $onInit() {
        // available parameters for the filter
        this.items = [
            // {name: 'All', id: 'all'},
            {name: 'Active', id: this.USER_STATUS_ACTIVE, type: 'status'},
            {name: 'Registered', id: this.USER_STATUS_DISABLE, type: 'status'},
            {name: 'Locked', id: this.USER_STATUS_LOCK, type: 'status'},
        ];

        // selected tags for filter
        this.tags = [
            this.items[0]
        ];

        // text in filter input
        this.searchText = '';

        // pagination
        // todo: get from settings
        this.perPageList = [20, 50, 100];
        this.meta = {
            current_page: 1,
            total: 0
        };
        this.limitPerPage = this.perPageList[0];

        // order
        this.sortList = [
            {param: 'id:asc', name: 'ID - Ascending'},
            {param: 'id:desc', name: 'ID - Descending'},
            {param: 'login:asc', name: 'Login - Ascending'},
            {param: 'login:desc', name: 'Login - Descending'},
            {param: 'firstname:asc', name: 'Firstname - Ascending'},
            {param: 'firstname:desc', name: 'Firstname - Descending'},
            {param: 'lastname:asc', name: 'Lastname - Ascending'},
            {param: 'lastname:desc', name: 'Lastname - Descending'},
        ];
        this.sort = this.sortList[3];

        this.loadProccess = false;
        this.load();
    }

    load() {
        this.loadProccess = true;
        this.usersService
            .all({
                type: 'User',
                per_page: this.limitPerPage,
                page: this.meta.current_page,
                order: this.sort.param,
                'status[]': this.tags.filter((e) => e.type === 'status').map((e) => e.id),
            })
            .then((response) => {
                this.users = response.data.data;

                this.meta = response.data.meta;
                this.links = response.data.links;
                this.groupsInfo = response.data.groups;
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message)
                    );
                }
            })
            .finally(() => {
                this.loadProccess = false;
            });

    }

    querySearch() {
        let items = this.items.filter((e) => {
                return !this.tags.some((tag) => tag.type === e.type && tag.id === e.id);
            }),
            query = this.searchText.toLowerCase();

        if (!query) {
            return items;
        }

        return items.filter((e) => {
            return (e.name.toLowerCase().indexOf(query) !== -1) ||
                (e.type.toLowerCase().indexOf(query) !== -1);
        });
    }

    onChangeFilterValue() {
        // this.meta.current_page = 1;
        this.load();
    }

    setSort(item) {
        this.sort = item;
        this.meta.current_page = 1;
        this.load();
    }

    setLimitPerPage(count) {
        this.limitPerPage = count;
        this.meta.current_page = 1;
        this.load();
    }

    next() {
        if (this.links.next) {
            this.meta.current_page++;
            this.load();
        }
    }

    previous() {
        if (this.links.prev) {
            this.meta.current_page--;
            this.load();
        }
    }

    // goto(userId) {
    //     this.$state.go('users.page.info', {id: userId});
    // }

    // lockUser(userId, status) {
    //     let confirm = this.$mdDialog.confirm()
    //         .title(status == '3' ? 'Would you like to unlock this user?' : 'Would you like to lock this user?')
    //         .ok(status == '3' ? 'unlock' : 'lock')
    //         .cancel('Cancel');
    //
    //     this.$mdDialog.show(confirm).then(() => {
    //         if (status == 3) {
    //             status = 1;
    //         } else {
    //             status = 3;
    //         }
    //         this.usersService.updateUserStatus(userId, {'status': status}).then((response) => {
    //             this.$rootScope.$emit('updateUsers');
    //         });
    //     });
    //
    // }

    // sortBy() {
    //     this.usersService.getList({status: this.filterForm.myOption}).then((response) => {
    //         this.list = response.data;
    //     });
    // }
    //
    // clearFilters() {
    //     this.filterForm.myOption = 0;
    //     this.filterForm.text = '';
    //     this.$rootScope.$emit('updateUsers');
    // }

    // deleteUser(userId) {
    //     let confirm = this.$mdDialog.confirm()
    //         .title(`Would you like to delete this user?`)
    //         .ok('Delete!')
    //         .cancel('Cancel');
    //
    //     this.$mdDialog.show(confirm).then(() => {
    //         this.usersService.deleteUser(userId).then(() => {
    //             this.$rootScope.$emit('updateUsers');
    //         });
    //     });
    // }
}