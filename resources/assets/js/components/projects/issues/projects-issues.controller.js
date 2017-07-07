import ControllerBase from 'base/controller.base';
import angular from 'angular';

/**
 * @property $state
 * @property $showdown
 * @property IssuesService
 * @property $stateParams
 */
export default class ProjectsIssuesController extends ControllerBase {

    static get $inject() {
        return ['$state','$showdown', 'IssuesService', '$stateParams'];
    }

    $onInit() {
        this.load();

        this.tags = [
            {name: 'open', type: 'status'}
        ];

        this.items = [
            // status
            {name: 'open', type: 'status'},
            {name: 'any', type: 'status'},

            // priority
            {name: 'normal', type: 'priority'},
            {name: 'low', type: 'priority'},
            {name: 'hight', type: 'priority'},
            {name: 'not normal', type: 'priority'},
            {name: 'not low', type: 'priority'},
            {name: 'not hight', type: 'priority'},

            // traker
            {name: 'feature', type: 'traker'},
            {name: 'not feature', type: 'traker'},
            {name: 'bug', type: 'traker'},
            {name: 'not bug', type: 'traker'},

            // author
            {name: 'me', type: 'author'},
            {name: 'not me', type: 'author'},

            // assignee
            {name: 'me', type: 'assignee'},
            {name: 'not me', type: 'assignee'},
            {name: 'any', type: 'assignee'},
            {name: 'none', type: 'assignee'},
        ];

        // this.selectedItem = null;
        // md-selected-item="$ctrl.selectedItem"
        this.searchText = null;
        this.selectedIssue = null;
        this.selectAllState = false;
        this.showMore = false;
    }

    load() {
        this.selectAllState = false;
        this.IssuesService.getListByProject(this.$stateParams.id)
            .then((response) => {
                this.list = response.data;
            });
    }

    selectAll() {
        this.selectAllState = !this.selectAllState;
        this.list.forEach((item) => {
            item.selected = this.selectAllState;
        });
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
        this.$state.go('issues.edit', {id: id});
    }

    editIssue(id) {
        this.$state.go('issues.edit', {id: id});
    }

    toggleShowMore(){
        this.showMore = !this.showMore;
    }
}