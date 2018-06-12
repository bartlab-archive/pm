import ControllerBase from 'base/controller.base';
import issuesViewModalTemplate from '../view-modal/issues-view-modal.html';
import IssuesViewModalController from '../view-modal/issues-view-modal.controller';

/**
 * @property {$state} $state
 * @property {$showdown} $showdown
 * @property {IssuesService} issuesService
 * @property {ProjectsService} projectsService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {UsersService} $mdDialog
 * @property {$filter} $filter
 */
export default class IssuesListController extends ControllerBase {

    static get $inject() {
        return ['$state', '$showdown', 'issuesService', 'projectsService', '$stateParams', '$rootScope', '$mdDialog', '$filter'];
    }

    static setMdDialogConfig(target, data = {}) {
        return {
            controller: IssuesViewModalController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: data,
            template: issuesViewModalTemplate,
            clickOutsideToClose: true,
            openFrom: target,
            closeTo: target,
        };
    }

    $onInit() {
        this.currentProjectId = this.projectsService.getCurrentId();

        // selected tags for filter
        this.tags = [];

        // available parameters for the filter
        this.items = [];

        // text in filter input
        this.searchText = '';

        // available parameters for the sorting
        this.sortList = [
            {param: 'id:asc', name: 'ID - Ascending'},
            {param: 'id:desc', name: 'ID - Descending'},
            {param: 'updated_on:asc', name: 'Updated - Oldest first'},
            {param: 'updated_on:desc', name: 'Updated - Newst first'},
        ];
        this.sort = this.sortList[3];

        // group by list
        this.groupByList = [
            {param: '', name: 'No group'},
            (!this.currentProjectId ? {param: 'project', name: 'Project'} : undefined),
            {param: 'tracker', name: 'Tracker'},
            {param: 'status', name: 'Status'},
            {param: 'priority', name: 'Priority'},
            {param: 'author', name: 'Author'},
            {param: 'assigned', name: 'Assignee'},
            {param: 'category', name: 'Category'},
            {param: 'version', name: 'Target version'},
            {param: 'done_ratio', name: '% Done'},
        ].filter((item) => item !== undefined);
        this.groupBy = this.groupByList[0];
        this.groupsInfo = [];

        // item selection
        this.selectedGroup = [];
        this.selectAllState = false;

        // pagination
        // todo: get from settings
        this.perPageList = [20, 50, 100];
        // this.count = 0;
        // this.offset = 0;
        // this.limitPerPage = this.perPageList[0];
        // this.pager = '';
        this.meta = {
            current_page: 1,
            total: 0
        };
        this.limitPerPage = this.perPageList[0];
        this.links = {};

        // issues list
        this.list = [];
        if (this.$stateParams.hasOwnProperty('assigned_to_ids') && this.$stateParams.assigned_to_ids != null) {
            // temp added to items list
            this.items.push({
                id: this.$stateParams.assigned_to_ids.id,
                type: 'assigned',
                name: this.$stateParams.assigned_to_ids.firstname + ' ' + this.$stateParams.assigned_to_ids.lastname
            });
            this.tags.push({
                id: this.$stateParams.assigned_to_ids.id,
                type: 'assigned',
                name: this.$stateParams.assigned_to_ids.firstname + ' ' + this.$stateParams.assigned_to_ids.lastname
            });
        }
        if (this.$stateParams.hasOwnProperty('author_ids') && this.$stateParams.author_ids != null) {
            // temp added to items list
            this.items.push({
                id: this.$stateParams.author_ids.id,
                type: 'created',
                name: this.$stateParams.author_ids.firstname + ' ' + this.$stateParams.author_ids.lastname
            });
            this.tags.push({
                id: this.$stateParams.author_ids.id,
                type: 'created',
                name: this.$stateParams.author_ids.firstname + ' ' + this.$stateParams.author_ids.lastname
            });
        }
        this.loadProccess = false;

        // available params for all issue
        this.statusList = [];
        this.priorityList = [];

        this.loadFiltersValues().then(() => this.load());
        // todo: remove event on destroy
        this.$rootScope.$on('updateIssues', () => this.load());
        // todo: add listener for "deldeteIssue"
    }

    load() {
        this.selectAllState = false;
        this.selectedGroup = [];
        this.loadProccess = true;
        this.list = [];

        return this.issuesService//.all()
            .all({
                project_identifier: this.projectsService.getCurrentId(),
                // limit: this.limitPerPage,
                // offset: this.offset,
                per_page: this.limitPerPage,
                page: this.meta.current_page,

                order: this.sort.param,
                group: this.groupBy.param,
                'status_ids[]': this.tags.filter((e) => e.type === 'status').map((e) => e.id),
                'tracker_ids[]': this.tags.filter((e) => e.type === 'tracker').map((e) => e.id),
                'priority_ids[]': this.tags.filter((e) => e.type === 'priority').map((e) => e.id),
                'assigned_to_ids[]': this.tags.filter((e) => e.type === 'assigned').map((e) => e.id),
                'author_ids[]': this.tags.filter((e) => e.type === 'created').map((e) => e.id)
            })
            .then((response) => {
                // todo: map data for prepare issues and not use filter  in html
                this.list = response.data.data.map((issue) => {
                    issue.descriptionHtml = this.makeHtml(issue.description);
                    return issue;
                });
                // this.offset = parseInt(response.headers('X-Offset')) || 0;
                // this.limitPerPage = parseInt(response.headers('X-Limit')) || 0;
                // this.count = parseInt(response.headers('X-Total')) || 0;
                this.meta = response.data.meta;
                this.links = response.data.links;
                this.groupsInfo = response.data.groups;
                // this.pager = this.getPager();
                this.loadProccess = false;
            });
    }

    makeHtml(text) {
        return text ? this.$filter('words')(this.$showdown.stripHtml(this.$showdown.makeHtml(text)), 20) : '';
    }

    // currentProjectId() {
    //     return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : null;
    // }

    onChangeFilterValue() {
        this.meta.current_page = 1;
        this.load();
    }

    loadFiltersValues() {
        // todo: separate for responses, remove filter api point
        return this.issuesService
            .filters({
                project_identifier: this.projectsService.getCurrentId()
            })
            // .get({
            //     project_identifier: this.projectsService.getCurrentId()
            // })
            .then((response) => {
                this.statusList = response.data.statuses.map((e) => {
                    e.type = 'status';

                    // default filter value
                    if (!e.is_closed) {
                        this.tags.push(e);
                    }

                    return e;
                });

                this.priorityList = response.data.priorities.map((e) => {
                    e.type = 'priority';
                    return e;
                });

                // filter available parameters
                this.items.push(
                    ...this.statusList,
                    ...this.priorityList,
                    ...response.data.trackers.map((e) => {
                        e.type = 'tracker';
                        return e;
                    })
                );
            });
    }

    selectAll() {
        this.selectAllState = !this.selectAllState;
        this.selectedGroup = [];

        this.list.forEach((item) => {
            item.selected = this.selectAllState;

            if (this.selectAllState) {
                this.addToSelectedGroup(item);
            }
        });
    }

    onSelectIssue(issue) {
        issue.selected ? this.addToSelectedGroup(issue) : this.removeFromSelectedGroup(issue.id);
    }

    addToSelectedGroup(issue) {
        this.selectedGroup.push(issue);
    }

    removeFromSelectedGroup(id) {
        const index = this.selectedGroup.findIndex((item) => {
            return item.id === id;
        });

        this.selectedGroup.splice(index, 1);
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

    viewIssue($event, issue) {
        // if ctrl or meta key press - process link click
        if ($event.ctrlKey || $event.metaKey) {
            return;
        }

        $event.preventDefault();

        this.$mdDialog.show(
            this.constructor.setMdDialogConfig($event.target, {
                selectedIssue: issue
            })
        );
    }

    // deleteGroup() {
    //     let title_issue = this.selectedGroup.length > 1 ? 'issues' : 'issue';
    //     let confirm = this.$mdDialog.confirm()
    //         .title(`Would you like to delete this ${title_issue}?`)
    //         .ok('Delete!')
    //         .cancel('Cancel');
    //
    //     this.$mdDialog.show(confirm).then(() => {
    //         this.selectedGroup.forEach((issue) => {
    //             this.deleteConfirmedIssue(issue.id);
    //         });
    //         this.selectedGroup = [];
    //     });
    // }

    // deleteConfirmedIssue(id) {
    //     this.IssuesService.deleteIssue(id).then(() => {
    //         this.$rootScope.$emit('updateIssues');
    //     });
    //
    //     this.selectedGroup = [];
    // }

    setSort(item) {
        this.sort = item;
        this.meta.current_page = 1;
        this.load();
    }

    setGroupBy(item) {
        this.groupBy = item;
        this.meta.current_page = 1;
        this.load();
    }

    setLimitPerPage(count) {
        this.limitPerPage = count;
        this.meta.current_page = 1;
        this.load();
    }

    // next() {
    //     if (this.offset + this.limitPerPage < this.count) {
    //         this.offset += this.limitPerPage;
    //         this.load();
    //     }
    // }
    //
    // previous() {
    //     if (this.offset > 0) {
    //         this.offset = this.offset - this.limitPerPage;
    //         this.load();
    //     }
    // }

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

    // getPager() {
    //     const currentPage = (this.offset === 0 ? this.offset + 1 : this.offset);
    //     const fromPage = (this.count < this.limitPerPage || this.count < this.offset + this.limitPerPage) ?
    //         this.count : this.limitPerPage + this.offset;
    //     const all = (this.count > this.limitPerPage ? ' /' + this.count : '');
    //
    //     return currentPage + '-' + fromPage + all;
    // }

    // openIssue(id) {
    //     this.$state.go('issues.info', {id: id});
    // }

    // editIssue(id) {
    //     this.$state.go('issues.edit', {id: id});
    // }

    copyIssue(item) {
        this.$state.go('issues-inner.copy', {id: item.id, project_id: item.project.identifier});
    }

    deleteIssue(item) {
        let confirm = this.$mdDialog.confirm()
            .title('Would you like to delete this issue?')
            .ok('Delete!')
            .cancel('Cancel');

        return this.$mdDialog.show(confirm)
            .then(() => item.remove())
            .then(() => this.load());
    }
}