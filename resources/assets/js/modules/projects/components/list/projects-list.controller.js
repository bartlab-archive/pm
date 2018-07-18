import ControllerBase from 'base/controller.base';

/**
 * @property {ProjectsService} ProjectsService
 * @property {$state} $state
 * @property {$window} $window
 */
export default class ProjectsListController extends ControllerBase {

    static get $inject() {
        return [
            'projectsService', '$state', '$showdown', '$window', '$mdToast', '$filter',
            'PROJECT_STATUS_OPEN', 'PROJECT_STATUS_CLOSE', 'PROJECT_STATUS_ARCHIVE'
        ];
    }

    $onInit() {
        // check state name for show extended project list
        this.isExtended = (this.$state.current.name === 'projects-admin');

        // available parameters for the filter
        this.items = [
            {type: 'status', name: 'Open', id: this.PROJECT_STATUS_OPEN},
            {type: 'status', name: 'Close', id: this.PROJECT_STATUS_CLOSE},
            // {type: 'status', name: 'ARCHIVED', id: 9},
            // {type: 'public', name: 'Public', id: 1},
            // {type: 'public', name: 'Private', id: 0},
        ];

        if (this.isExtended) {
            this.items.push({type: 'status', name: 'Archived', id: this.PROJECT_STATUS_ARCHIVE});
            this.items.push({type: 'public', name: 'Public', id: 1});
            this.items.push({type: 'public', name: 'Private', id: 0});
        }

        // selected tags for filter
        this.tags = [this.items[0]];

        // text in filter input
        this.searchText = '';

        this.list = [];

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
        this.meta = {
            current_page: 1,
            total: 0
        };
        this.limitPerPage = this.perPageList[0];
        this.links = {};

        this.loadProccess = false;

        this.load();
    }

    load() {
        this.loadProccess = true;

        return this.projectsService
            .all({
                per_page: this.limitPerPage,
                page: this.meta.current_page,
                order: this.sort.param,
                'status_ids[]': this.tags.filter((e) => e.type === 'status').map((e) => e.id),
                'public[]': this.tags.filter((e) => e.type === 'public').map((e) => e.id)
            })
            .then((response) => {
                this.list = response.data.data.map((project) => {
                    project.description = this.makeHtml(project.description);
                    project._name = this.$filter('limitTo')(project.name, 1);

                    if (project.status !== this.PROJECT_STATUS_ARCHIVE) {
                        project._sref = this.$state.href(this.isExtended ? 'projects.inner.settings' : 'projects.inner.info', {project_id: project.identifier});
                    }

                    // get active project modules
                    project._modules = this.projectsService
                        .getModules()
                        .filter((module) => {
                            if (typeof module.enable === 'function') {
                                return module.enable(project);
                            }

                            if (module.name) {
                                return project.modules && project.modules.some((value) => value.name === module.name);
                            }

                            return module.enable;
                        });

                    return project;
                });

                this.meta = response.data.meta;
                this.links = response.data.links;
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
        this.meta.current_page = 1;
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

    makeHtml(text) {
        return text ? this.$filter('words')(this.$showdown.stripHtml(this.$showdown.makeHtml(text)), 50) : '';
    }

}