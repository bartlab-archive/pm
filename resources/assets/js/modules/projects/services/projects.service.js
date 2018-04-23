// import ServiceBase from 'base/service.base';
import InjectableBase from "base/injectable.base";
// import _ from 'lodash';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 * @property {object} $stateParams
 * @property {object} provider
 * @property {array} modules
 * @property {array} settings
 */
export default class ProjectsService extends InjectableBase {

    static get $inject() {
        return ['Restangular', '$cacheFactory', '$stateParams', '$rootScope', '$http'];
    }

    $onInit() {
        // console.log(this,this.constructor.provider,this.provider);
        // console.log('ProjectsService');
        // this.cache = this.$cacheFactory(this.name);
        // this.project = {};

        // this.rest = this.Restangular
        // .setDefaultHttpFields({cache: true})
        //     .setRestangularFields({
        //         id: 'identifier'
        //     })
        //     .addResponseInterceptor((data, operation, what, url, response, deferred) => {
        //         if (operation === 'put') {
        //             // console.log('updateProjectInfo');
        //             this.$rootScope.$emit('updateProjectInfo');
        //         }
        //         // console.log(operation);
        //         return data;
        //     })
        //     .setRequestInterceptor((element, operation, route, url) => {
        //         // delete(element.identifier);
        //         if (operation === 'put' || operation === 'post') {
        //             element.modules ? delete(element.modules) : '';
        //             element.members ? delete(element.members) : '';
        //         }
        //
        //         return element;
        //     })
        // .withConfig((...args) => this.config(...args))
        // .all('projects');
    }

    getModules() {
        // return this.modules;
        return [].concat(
            [{
                url: 'projects.inner.info',
                title: 'Overview'
            }],
            this.modules,
            [{
                url: 'projects.inner.settings',
                title: 'Settings'
            }]);
    }

    getSettings() {
        return this.settings;
    }

    one(id) {
        // return this.Restangular.one('projects', id);
        return this.$http.get('/api/v1/projects/' + id);
    }

    all(params) {
        return this.$http.get('/api/v1/projects', {params});
        // return this.rest;
    }

    enabledModules(id) {
        return this.$http.get('/api/v1/modules/' + id);
        // return this.rest.one(id).all('modules');
    }

    updateModules(id, modules) {
        return this.$http.put('/api/v1/modules/' + id, modules);
    }

    addMember(identifier, user, roles) {
        return this.$http.post('/api/v1/members', {identifier, user, roles});
    }

    updateMember(id, roles) {
        return this.$http.put('/api/v1/members/' + id, {roles});
    }

    deleteMember(id) {
        return this.$http.delete('/api/v1/members/' + id);
    }

    getCurrentId() {
        return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : null;
    }

    setCurrentId(id) {
        this.$stateParams.project_id = id;
    }
}