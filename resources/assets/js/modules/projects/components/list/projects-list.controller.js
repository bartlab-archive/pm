import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$state} $state
 * @property {$window} $window
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return ['projectsService', '$state', '$showdown', '$window', '$mdToast'];
    }

    $onInit() {
        // available parameters for the filter
        this.items = [
            {type: 'status', name: 'Open', id: 1},
            {type: 'status', name: 'Close', id: 5},
            // {type: 'status', name: 'ARCHIVED', id: 9},
            {type: 'public', name: 'Public', id: 1},
            {type: 'public', name: 'Private', id: 0},
        ];

        // selected tags for filter
        this.tags = [this.items[0]];

        // text in filter input
        this.searchText = '';

        this.list = [];
        // this.showClosed = 1;

        // available parameters for the sorting
        this.sortList = [
            {param: 'id:asc', name: 'ID - Ascending'},
            {param: 'id:desc', name: 'ID - Descending'},
            {param: 'name:asc', name: 'Name - Ascending'},
            {param: 'name:desc', name: 'Name - Descending'},
            {param: 'updated_on:asc', name: 'Updated - Oldest first'},
            {param: 'updated_on:desc', name: 'Updated - Newst first'},
        ];
        this.sort = this.sortList[2];

        // pagination
        this.perPageList = [20, 50, 100];
        // this.count = 0;
        // this.offset = 0;
        this.meta = {
            current_page: 1,
            total: 0
        };
        this.limitPerPage = this.perPageList[0];
        this.links = {};
        // this.pager = '';

        this.loadProccess = false;

        this.load();
    }

    load() {
        this.loadProccess = true;
        this.list = [];

        return this.projectsService
        // .all()
            .all({
                // closed: this.showClosed,
                per_page: this.limitPerPage,
                page: this.meta.current_page,
                // offset: this.offset,
                order: this.sort.param,
                'status_ids[]': this.tags.filter((e) => e.type === 'status').map((e) => e.id),
                'public[]': this.tags.filter((e) => e.type === 'public').map((e) => e.id)
            })
            .then((response) => {
                this.list = response.data.data.map((e) => {
                    e.description = this.makeHtml(e.description);
                    return e;
                });

                // this.offset = parseInt(response.headers('X-Offset')) || 0;
                // this.limitPerPage = parseInt(response.headers('X-Limit')) || 0;
                // this.count = parseInt(response.headers('X-Total')) || 0;
                this.meta = response.data.meta;
                this.links = response.data.links;
                // this.pager = this.getPager();
                // this.loadProccess = false;
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

    // getPager() {
    // const currentPage = (this.offset === 0 ? this.offset + 1 : this.offset);
    // const fromPage = (this.count < this.limitPerPage || this.count < this.offset + this.limitPerPage) ?
    //     this.count : this.limitPerPage + this.offset;
    // const all = (this.count > this.limitPerPage ? ' /' + this.count : '');
    //
    // return currentPage + '-' + fromPage + all;
    // return this.meta.from + ' - ' + this.meta.to + ' / ' + this.meta.total;
    // }

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
        this.meta.current_page = 1;
        this.load();
    }

    goto(identifier) {
        this.$state.go('projects.inner.info', {project_id: identifier});
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

    //
    // newProject() {
    //     this.$state.go('projects.new');
    // }

    makeHtml(text) {
        return text ? this.$showdown.stripHtml(this.$showdown.makeHtml(text)) : '';
    }

}