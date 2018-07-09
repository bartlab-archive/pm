// import ServiceBase from 'base/service.base';
import InjectableBase from "base/injectable.base";

/**
 * @property {$cacheFactory} $cacheFactory
 * @property {object} $stateParams
 * @property {object} provider
 * @property {array} modules
 * @property {array} settings
 */
export default class ProjectsService extends InjectableBase {

    static get $inject() {
        return ['$stateParams', '$http'];
    }

    $onInit() {
    }

    getModules() {
        // return this.modules;
        return [].concat(
            [{
                url: 'projects.inner.info',
                title: 'Overview'
            }],
            this.modules.map((module) => Object.assign({}, module)),
            [{
                url: 'projects.inner.settings',
                title: 'Settings'
            }]);
    }

    getSettings() {
        return this.settings;
    }

    one(id) {
        return this.$http.get(`/api/v1/projects/${id}`, {timeToLive: 2 * 1000});
    }

    all(params) {
        return this.$http.get('/api/v1/projects', {params});
    }

    create(params) {
        return this.$http.post('/api/v1/projects', params)
    }

    update(identifier, params) {
        return this.$http.put(`/api/v1/projects/${identifier}`, params);
    }

    // enabledModules(id) {
    //     return this.$http.get('/api/v1/modules/' + id);
    // return this.rest.one(id).all('modules');
    // }

    updateModules(id, modules) {
        return this.$http.put(`/api/v1/modules/${id}`, modules);
    }

    addMember(identifier, user, roles) {
        return this.$http.post('/api/v1/members', {identifier, user, roles});
    }

    updateMember(id, roles) {
        return this.$http.put(`/api/v1/members/${id}`, {roles});
    }

    deleteMember(id) {
        return this.$http.delete(`/api/v1/members/${id}`);
    }

    getCurrentId() {
        return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : undefined;
    }

    setCurrentId(id) {
        this.$stateParams.project_id = id;
    }
}