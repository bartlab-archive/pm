import _ from 'lodash';
import ServiceBase from "base/service.base";

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class ProjectsService extends ServiceBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory'];
    }

    get modules() {
        return [
            {id: 'issue_tracking', name: 'Issue tracking'},
            {id: 'time_tracking', name: 'Time tracking '},
            {id: 'news', name: 'News'},
            {id: 'documents', name: 'Documents'},
            {id: 'files', name: 'Files'},
            {id: 'wiki', name: 'Wiki'},
            {id: 'repository', name: 'Repository'},
            {id: 'boards', name: 'Forums'},
            {id: 'calendar', name: 'Calendar'},
            {id: 'gantt', name: 'Gantt'},
        ];
    }

    $onInit($injector) {
        // this.cache = this.$cacheFactory(this.name);
        // this.project = {};
    }

    one(identifier) {
        return this.Restangular.all('projects').one(identifier)
        // .withHttpConfig({cache: this.cache})
            .get();
    }

    getModules(data) {
        let module = {};
        _.forEach(data, (value, key) => {
            module[value.name] = true;
        });

        return module;
    };

    getList(params) {
        return this.Restangular.all('projects').getList(params);
    }

    getMyList() {
        return this.getList().then((response) => {
            return _.filter(response.data, {is_my: 1});
        });
    }

    getNews(identifier) {
        return this.Restangular.all('projects').one(identifier).one('news').getList();
    }

    getTrackers(identifier) {
        return this.Restangular.one('projects', identifier).one('trackers')
        // .withHttpConfig({cache: this.cache})
            .get();
    }

    create(params) {
        return this.Restangular.all('projects').post(params);
    }

    updateModules(identifier, params) {
        return this.Restangular.one('projects', identifier).customPUT(params, 'modules');
    }

    updateInformation(identifier, params) {
        return this.Restangular.one('projects', identifier).customPUT(params, 'information');
    }

    /* Members */
    deleteMember(memberId) {
        return this.Restangular.one('projects').one('members', memberId).remove();
    }

    updateMember(memberId, data) {
        return this.Restangular.one('projects', 'members').customPUT(data, memberId);
    }

    createMember(identifier, data) {
        return this.Restangular.one('projects', identifier).all('members').post(data);
    }

    /* Versions */
    getVersionStatuses() {
        return {
            open: {name: 'Open', selected: true},
            locked: {name: 'Locked'},
            closed: {name: 'Closed'},
        };
    }

    getVersionSharings() {
        return {
            none: {name: 'Not shared', selected: true},
            descendants: {name: 'With subprojects'},
            hierarchy: {name: 'With project hierarchy'},
            tree: {name: 'With project tree'},
            system: {name: 'With all projects'}
        };
    }

    createVersion(identifier, data) {
        return this.Restangular.one('projects', identifier).all('versions').post(data);
    }

    deleteMember(versionId) {
        return this.Restangular.one('projects').one('versions', versionId).remove();
    }

    editVersion(versionId, data) {
        return this.Restangular.one('projects', 'versions').customPUT(data, versionId);
    }

    closeCompletedVersions(identifier){
        return this.Restangular.one('projects', identifier).one('versions','close-completed').put();
    }

    createIssueCategory(identifier, data) {
        return this.Restangular.one('projects', identifier).all('issue-categories').post(data);
    }

    deleteIssueCategory(issueCategoriesId) {
        return this.Restangular.one('projects').one('issue-categories', issueCategoriesId).remove();
    }

    editIssueCategory(issueCategoriesId, data) {
        return this.Restangular.one('projects', 'issue-categories').customPUT(data, issueCategoriesId);
    }

    editWiki(wikiId, data) {

        return this.Restangular.one('projects', 'wiki').customPUT(data, wikiId);
    }
}