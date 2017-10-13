import ControllerBase from 'base/controller.base';
import angular from 'angular';
import * as _ from "lodash";

/**
 * @property {$state} $state
 * @property {$showdown} $showdown
 * @property {IssuesService} IssuesService
 * @property {ProjectsService} ProjectsService
 * @property {$stateParams} $stateParams
 * @property {$rootScope} $rootScope
 * @property {TrackersService} TrackersService
 * @property {UsersService} UsersService
 */
export default class IssuesListController extends ControllerBase {

    static get $inject() {
        return ['$state', '$showdown', 'IssuesService', 'ProjectsService', '$stateParams', '$window', '$rootScope', 'TrackersService', 'UsersService'];
    }

    $onInit() {
        const currentProjectId = this.currentProjectId();
        this.ProjectsService.one(currentProjectId).then((response) => {
            const enabledModules = _.get(response, 'data.enabled_modules', []);
            if (!this.ProjectsService.isModuleEnabled('issue_tracking', enabledModules) && currentProjectId != undefined) {
                this.$state.go('projects.inner.info', {project_id: currentProjectId});
            }

            this.tags = [];
            this.items = [];
            this.statusesList = [];
            this.prioritiesList = [];
            this.showMore = false;
            this.searchText = null;
            this.selectedIssue = null;
            this.selectedGroup = [];
            this.selectAllState = false;
            this.offset = 0;
            this.limitPerPage = 20;
            this.members = this.ProjectsService.getMembersList(_.get(response, 'data', []));

            this.loadFiltersValues();
            this.load();
            this.$rootScope.$on('updateIssues', () => this.load());
            this.initScrollbar();

            this.UsersService.getList().then((response) => {
                this.users = _.keyBy(_.get(response, 'data', null), 'id');
            });
        });

        this.ProjectsService.getList().then((response) => {
            this.projects = _.keyBy(_.get(response, 'data', null), 'id');
        });
    }

    load() {
        let params = {
            'status_ids': [],
            'tracker_ids': [],
            'priority_ids': [],
            'limit': this.limitPerPage,
            'offset': this.offset
        };

        if (!_.isEmpty(this.tags)) {

            _.forEach(this.tags, (item) => {
                switch (item.type) {
                    case 'tracker':
                        params.tracker_ids.push(item.id);
                        break;
                    case 'status' :
                        params.status_ids.push(item.id);
                        break;

                    case 'priority' :
                        params.priority_ids.push(item.id);
                        break;
                }
            });
        }

        this.selectAllState = false;
        this.IssuesService.getListByProject(this.$stateParams.project_id, params)
            .then((response) => {
                this.list = _.keyBy(response.data, 'id');
                this.count = response.headers('X-Total');
            });

        this.selectedGroup = [];
    }

    onChangeFilterValue() {
        this.selectedGroup = [];
        this.offset = 0;
        this.load();
    }

    loadFiltersValues() {
        this.IssuesService.getIssuesFilters({enumeration_type: 'IssuePriority'}).then((response) => {
            if (!_.isEmpty(response.data)) {
                this.statuses = _.keyBy(_.get(response, 'data.statuses', null), 'id');
                this.trackers = _.keyBy(_.get(response, 'data.trackers', null), 'id');
                this.priorities = _.keyBy(_.get(response, 'data.priorities', null), 'id');

                if (this.statuses) {
                    _.forEach(this.statuses, (item) => {
                        item.type = 'status';
                        this.statusesList[item.id] = item.name;
                        this.items.push(item);
                    });
                }

                if (this.trackers) {
                    _.forEach(this.trackers, (item) => {
                        item.type = 'tracker';
                        this.items.push(item);
                    });
                }

                if (this.priorities) {
                    _.forEach(this.priorities, (item) => {
                        item.type = 'priority';
                        this.prioritiesList[item.id] = item.name;
                        this.items.push(item);
                    });
                }
            }
        });
    }

    initScrollbar() {
        angular.element(this.$window).bind('resize', () => this.setScrollbarContainerHeight());
        this.setScrollbarContainerHeight();
    }

    selectAll() {
        this.selectAllState = !this.selectAllState;
        this.selectedGroup = [];

        Object.values(this.list).forEach((item) => {
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

    setScrollbarContainerHeight() {
        let windowHeight = window.innerHeight;

        if (!this.$stateParams.project_id) {
            windowHeight += 50;
        }

        this.scrollBarConfigIssue = {
            setHeight: windowHeight - 340
        };

        this.scrollBarConfigDescription = {
            setHeight: windowHeight - 292
        };
    }

    makeHtml(text) {
        return text ? this.$showdown.stripHtml(this.$showdown.makeHtml(text)) : '';
    }

    querySearch(query) {
        return query ? this.items.filter(this.createFilterFor(query)) : [];
    }

    createFilterFor(query) {
        let lowercaseQuery = angular.lowercase(query);

        return function filterFn(vegetable) {
            return (vegetable.name.indexOf(lowercaseQuery) !== -1) ||
                (vegetable.type.indexOf(lowercaseQuery) !== -1);
        };
    }

    viewIssue(issue) {
        this.selectedIssue = issue;
    }

    closeIssueCard() {
        this.selectedIssue = null;
    }

    openIssue(id) {
        this.$state.go('issues.info', {project_id: this.$stateParams.project_id, id: id});
    }

    editIssue(id) {
        this.$state.go('issues.edit', {project_id: this.$stateParams.project_id, id: id});
    }

    watchIssue(id) {
        this.$state.go('issues.watch', {project_id: this.$stateParams.project_id, id: id});
    }

    unwatchIssue(id) {
        this.$state.go('issues.unwatch', {project_id: this.$stateParams.project_id, id: id});
    }

    copyIssue(id) {
        this.$state.go('issues.copy', {project_id: this.$stateParams.project_id, id: id});
    }

    deleteIssue(id) {
        this.IssuesService.deleteIssue(id).then(() => {
            this.$rootScope.$emit('updateIssues');
        });

        this.selectedGroup = [];
    }

    deleteGroup() {
        this.selectedGroup.forEach((issue) => {
            this.deleteIssue(issue.id);
        });

        this.selectedGroup = [];
    }

    toggleShowMore() {
        this.showMore = !this.showMore;
    }

    openLimitMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    setLimitPerPage(count) {
        this.limitPerPage = count;
        this.onChangeFilterValue();
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

    currentProjectId() {
        return _.get(this.$state, 'data.layoutDefault.projectId') || _.get(this.$stateParams, 'project_id');
    }

    getPager() {
        const currentPage = this.offset === 0 ? this.offset + 1 : this.offset;
        const fromPage = (this.count < this.limitPerPage || this.count < this.offset + this.limitPerPage) ?
            this.count : this.limitPerPage + this.offset;
        const all = this.count > this.limitPerPage ? ' /' + this.count : '';

        return currentPage + '-' + fromPage + all;
    }

    assignTo(taskId, memberId) {
        this.list[taskId].assigned_to_id = memberId;
        this.list[taskId].project_id = this.list[taskId].project.id;
        delete this.list[taskId].identifier;

        this.IssuesService.update(this.list[taskId]).then((response) => {
            this.list[taskId] = response.data;
        });
    }

    setPriority(taskId, priorityId) {
        this.list[taskId].priority_id = priorityId;
        this.list[taskId].project_id = this.list[taskId].project.id;
        delete this.list[taskId].identifier;

        this.IssuesService.update(this.list[taskId]).then((response) => {
            this.list[taskId] = response.data;
        });
    }

    setStatus(taskId, statusId) {
        this.list[taskId].status_id = statusId;
        this.list[taskId].project_id = this.list[taskId].project.id;
        delete this.list[taskId].identifier;

        this.IssuesService.update(this.list[taskId]).then((response) => {
            this.list[taskId] = response.data;
        });
    }
}