import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 */
export default class WikisService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    all(indetifire) {
        return this.$http.get(`/api/v1/wikis/${indetifire}`);
    }

    one(indetifire, name = undefined) {
        return this.$http.get(`/api/v1/wikis/${indetifire}/page${name ? '/' + name : ''}`);
    }

    createWiki(indetifire, data) {
        return this.$http.post(`/api/v1/wikis/${indetifire}/start`, data);
    }

    updateWiki(indetifire, data) {
        return this.$http.put(`/api/v1/wikis/${indetifire}/start`, data);
    }

    createPage(indetifire, data) {
        return this.$http.post(`/api/v1/wikis/${indetifire}/page`, data);
    }

    update(indetifire, name, data) {
        return this.$http.put(`/api/v1/wikis/${indetifire}/page/${name}`, data);
    }

    getWiki(indetifire) {
        return this.$http.get(`/api/v1/wikis/${indetifire}/start`);
    }
}