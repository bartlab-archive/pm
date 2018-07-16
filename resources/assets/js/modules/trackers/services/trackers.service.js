import ServiceBase from 'base/service.base';

export default class TrackersService extends ServiceBase {

    static get $inject() {
        return ['$http'];
    }

    all() {
        return this.$http.get('/api/v1/trackers');
    }

}