import ServiceBase from 'base/service.base';
import _ from 'lodash';

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
            {id: 'agile', name: 'Agile'},
        ];
    }

    $onInit($injector) {
        // this.cache = this.$cacheFactory(this.name);
        // this.project = {};
    }

    one(identifier, params = {
        'status_ids': [],
        'tracker_ids': [],
        'priority_ids': [],
        'limit': 20,
        'offset': 0
    }) {
        if (identifier === undefined) {
            return this.Restangular.one('projects', identifier).all('issues').post(params);
        }

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

    isModuleEnabled(moduleName, modulesData) {
        const enabledModules = this.getModules(modulesData);
        return (typeof enabledModules[moduleName] !== 'undefined');
    }

    getList(params = {}) {
        return this.Restangular.all('projects').getList(params);
    }

    deleteProject(identifier) {
        return this.Restangular.one('projects', identifier).remove();
    }

    copyProject(identifier){
        this.Restangular.one('projects', identifier).copy();
    }

    getMyList() {
        return this.getList().then((response) => {
            return _.filter(response.data, {is_my: 1});
        });
    }

    getNews(identifier) {
        return this.Restangular.all('projects').one(identifier).one('news').getList();
    }

    getProjectIssues(identifier) {
        return this.Restangular.one('projects', identifier).one('issues-count')
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

    updateProjectStatus(identifier, params) {
        return this.Restangular.one('projects', identifier).customPUT(params, 'updatestatus');
    }

    /* Members */
    deleteMember(memberId) {
        return this.Restangular.one('projects').one('members', memberId).remove();
    }

    updateMember(memberId, roleId) {
        return this.Restangular.one('projects', 'members').customPUT({role_id: roleId}, memberId);
    }

    createMember(identifier, userId, roleId) {
        return this.Restangular.one('projects', identifier).all('members').post({user_id: userId, role_id: roleId});
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

    deleteVersion(versionId) {
        return this.Restangular.one('projects').one('versions', versionId).remove();
    }

    editVersion(versionId, data) {
        return this.Restangular.one('projects', 'versions').customPUT(data, versionId);
    }

    closeCompletedVersions(identifier) {
        return this.Restangular.one('projects', identifier).one('versions', 'close-completed').put();
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

    createForum(identifier, data) {
        return this.Restangular.one('projects', identifier).all('forums').post(data);
    }

    deleteForum(forumId) {
        return this.Restangular.one('projects').one('forums', forumId).remove();
    }

    editForum(forumId, data) {
        return this.Restangular.one('projects', 'forums').customPUT(data, forumId);
    }

    createActivity(identifier, data) {
        return this.Restangular.one('projects', identifier).all('activities').post(data);
    }

    deleteActivity(activityId) {
        return this.Restangular.one('projects').one('activities', activityId).remove();
    }

    editActivity(activityId, data) {
        return this.Restangular.one('projects', 'activities').customPUT(data, activityId);
    }

    getMembersList(project) {
        let members = {};
        _.forEach(project.members, (member, key) => {
            members[member.user_id] = {
                name: member.users.firstname + ' ' + member.users.lastname,
                role: member.member_roles.roles.name,
                role_id: member.member_roles.roles.id,
                user_id: member.users.id,
                member_id: member.id,
                inherited_member: false,
            };
        });

        if (project.parent_project && project.inherit_members) {
            _.forEach(project.parent_project.members, (member, key) => {
                members[member.user_id] = {
                    name: member.users.firstname + ' ' + member.users.lastname,
                    role: member.member_roles.roles.name,
                    role_id: member.member_roles.roles.id,
                    user_id: member.users.id,
                    member_id: member.id,
                    inherited_member: true,
                };
            });
        }

        return members;
    }

    getActivity(identifier, params) {
        return this.Restangular.all('projects').one(identifier, 'activity').customGET('', params);
    }

}