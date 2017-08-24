import ControllerBase from 'base/controller.base';
import angular from 'angular';
import * as _ from "lodash";

/**
 * @property {$state} $state
 * @property {$showdown} $showdown
 * @property {IssuesService} IssuesService
 * @property {$stateParams} $stateParams
 */
export default class IssuesListController extends ControllerBase {

    static get $inject() {
        return ['$state', '$showdown', 'IssuesService', '$stateParams', '$window'];
    }

    $onInit() {

        this.tags = [];
        this.items = [];
        this.statusesList = [];
        this.prioritiesList = [];
        this.showMore = false;
        this.searchText = null;
        this.selectedIssue = null;
        this.selectAllState = false;
        this.offset = 0;

        this.loadFiltersValues();
        this.load();
        this.initScrollbar();
    }

    load() {
        let params = {
            'status_ids': [],
            'tracker_ids': [],
            'priority_ids': [],
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
                this.list = response.data;
                this.count = response.headers('X-Total');
            });
    }

    onChangeFilterValue() {
        this.offset = 0;
        this.load();
    }

    loadFiltersValues() {
        this.IssuesService.getIssuesFilters().then((response) => {
            if (!_.isEmpty(response.data)) {
                this.statuses = _.get(response, 'data.statuses', null);
                this.trackers = _.get(response, 'data.trackers', null);
                this.priorities = _.get(response, 'data.priorities', null);

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
        this.list.forEach((item) => {
            item.selected = this.selectAllState;
        });
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

    viewIssue(id) {
        this.selectedIssue = id;
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

    toggleShowMore() {
        this.showMore = !this.showMore;
    }

    next() {
        if (this.offset + 20 < this.count) {
            this.offset += 20;
            this.load();
        }
    }

    previous() {
        if (this.offset > 0) {
            this.offset = this.offset - 20;
            this.load();
        }
    }
}