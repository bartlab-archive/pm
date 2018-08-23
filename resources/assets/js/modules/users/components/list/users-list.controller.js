import ControllerBase from 'base/controller.base';

// todo: filter by groups
// todo: delete, lock, unlock, activete for users

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
        this.sort = this.sortList[2];

        this.loadProcess = false;
        this.load();
    }

    load() {
        this.loadProcess = true;

        this.usersService
            .all({
                type: 'User',
                per_page: this.limitPerPage,
                page: this.meta.current_page,
                order: this.sort.param,
                status: this.tags.filter((e) => e.type === 'status').map((e) => e.id)
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
                this.loadProcess = false;
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
}