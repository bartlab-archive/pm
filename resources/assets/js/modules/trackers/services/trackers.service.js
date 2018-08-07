import ServiceBase from 'base/service.base';

export default class TrackersService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    all(identifier) {
        let params = {};

        if (identifier) {
            params.project_identifier = identifier;
        }

        return this.$http.get('/api/v1/issues/trackers', {params});
    }

    state(identifier) {
        return this.$http.get(`/api/v1/issues/trackers/project/${identifier}`);
    }

    updateState(identifier, data) {
        return this.$http.put(`/api/v1/issues/trackers/project/${identifier}`, {trackers: data});
    }

}