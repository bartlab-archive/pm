import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 */
export default class WikisService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    oneWiki(indetifire) {
        return this.$http.get(`/api/v1/projects/${indetifire}/wikis`);
    }

    createWiki(indetifire, data) {
        return this.$http.post(`/api/v1/projects/${indetifire}/wikis`, data);
    }

    updateWiki(indetifire, data) {
        return this.$http.put(`/api/v1/projects/${indetifire}/wikis`, data);
    }

    allPages(indetifire) {
        return this.$http.get(`/api/v1/projects/${indetifire}/wikis/pages`);
    }

    onePage(indetifire, name) {
        return this.$http.get(`/api/v1/projects/${indetifire}/wikis/pages/${name}`);
    }

    createPage(indetifire, data) {
        return this.$http.post(`/api/v1/projects/${indetifire}/wikis/pages`, data);
    }

    updatePage(indetifire, id, data) {
        return this.$http.put(`/api/v1/projects/${indetifire}/wikis/pages/${id}`, data);
    }

    removePage(indetifire, id) {
        return this.$http.delete(`/api/v1/projects/${indetifire}/wikis/pages/${id}`)
    }

    watch(indetifire, id) {
        return this.$http.post(`/api/v1/projects/${indetifire}/wikis/pages/${id}/watch`);
    }

    unwatch(indetifire, id) {
        return this.$http.delete(`/api/v1/projects/${indetifire}/wikis/pages/${id}/watch`)
    }

    lock(indetifire, id) {
        return this.$http.post(`/api/v1/projects/${indetifire}/wikis/pages/${id}/lock`);
    }

    unlock(indetifire, id) {
        return this.$http.delete(`/api/v1/projects/${indetifire}/wikis/pages/${id}/unlock`)
    }
}