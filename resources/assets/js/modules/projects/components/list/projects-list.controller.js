import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$state} $state
 * @property {$window} $window
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return ['ProjectsService', '$state', '$showdown', '$window'];
    }

    $onInit() {
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
        this.count = 0;
        this.offset = 0;
        this.limitPerPage = this.perPageList[0];
        this.pager = '';

        this.loadProccess = false;

        this.load();
    }

    load() {
        this.loadProccess = true;
        this.list = [];

        this.ProjectsService.all()
            .getList({
                // closed: this.showClosed,
                limit: this.limitPerPage,
                offset: this.offset,
                order: this.sort.param,
            })
            .then((response) => {
                this.list = response.data.map((e) => {
                    e.description = this.makeHtml(e.description);
                    return e;
                });
                this.offset = parseInt(response.headers('X-Offset')) || 0;
                this.limitPerPage = parseInt(response.headers('X-Limit')) || 0;
                this.count = parseInt(response.headers('X-Total')) || 0;
                this.pager = this.getPager();
                this.loadProccess = false;
            });
    }

    getPager() {
        const currentPage = (this.offset === 0 ? this.offset + 1 : this.offset);
        const fromPage = (this.count < this.limitPerPage || this.count < this.offset + this.limitPerPage) ?
            this.count : this.limitPerPage + this.offset;
        const all = (this.count > this.limitPerPage ? ' /' + this.count : '');

        return currentPage + '-' + fromPage + all;
    }

    goto(identifier) {
        this.$state.go('projects.inner.info', {project_id: identifier});
    }

    setSort(item) {
        this.sort = item;
        this.offset = 0;
        this.load();
    }

    setLimitPerPage(count) {
        this.limitPerPage = count;
        this.offset = 0;
        this.load();
    }

    next() {
        if (this.offset + this.limitPerPage < this.count) {
            this.offset += this.limitPerPage;
            this.load();
        }
    }

    previous() {
        if (this.offset > 0) {
            this.offset = this.offset - this.limitPerPage;
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