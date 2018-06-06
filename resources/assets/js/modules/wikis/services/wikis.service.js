import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 */
export default class WikisService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    oneWiki(indetifire) {
        return this.$http.get(`/api/v1/wikis/${indetifire}`);
    }

    createWiki(indetifire, data) {
        return this.$http.post(`/api/v1/wikis/${indetifire}`, data);
    }

    updateWiki(indetifire, data) {
        return this.$http.put(`/api/v1/wikis/${indetifire}`, data);
    }

    allPages(indetifire) {
        return this.$http.get(`/api/v1/wikis/${indetifire}/pages`);
    }

    onePage(indetifire, name) {
        return this.$http.get(`/api/v1/wikis/${indetifire}/pages/${name}`);
    }

    createPage(indetifire, data) {
        return this.$http.post(`/api/v1/wikis/${indetifire}/pages`, data);
    }

    updatePage(indetifire, id, data) {
        return this.$http.put(`/api/v1/wikis/${indetifire}/pages/${id}`, data);
    }

    watch(indetifire, id) {
        return this.$http.post(`/api/v1/wikis/${indetifire}/pages/${id}/watch`);
    }

    unwatch(indetifire, id) {
        return this.$http.delete(`/api/v1/wikis/${indetifire}/pages/${id}/watch`)
    }

    lock(indetifire, id) {
        return this.$http.post(`/api/v1/wikis/${indetifire}/pages/${id}/lock`);
    }

    unlock(indetifire, id) {
        return this.$http.delete(`/api/v1/wikis/${indetifire}/pages/${id}/unlock`)
    }
}