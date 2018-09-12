import ServiceBase from 'base/service.base';

export default class TrackersService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    all(identifier) {
        const prefix = identifier ? 'projects/' + identifier + '/' : '';

        return this.$http.get(`/api/v1/${prefix}trackers`);
    }

    state(identifier) {
        return this.$http.get(`/api/v1/projects/${identifier}/trackers`);
    }

    updateState(identifier, data) {
        return this.$http.put(`/api/v1/projects/${identifier}/trackers`, {trackers: data});
    }

}