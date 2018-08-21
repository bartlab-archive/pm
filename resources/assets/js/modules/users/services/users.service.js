import ServiceBase from 'base/service.base';

export default class UsersService extends ServiceBase {

    get notifications() {
        return [
            {value: 'all', name: 'For any event on all my projects'},
            {value: 'selected', name: 'For any event on the selected projects only...'},
            {value: 'only_my_events', name: 'Only for things I watch or I\'m involved in'},
            {value: 'only_assigned', name: 'Only for things I am assigned to'},
            {value: 'only_owner', name: 'Only for things I am the owner of'},
            {value: 'none', name: 'No events'}
        ];
    }

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    one(id) {
        return this.$http.get(`/api/v1/users/${id}`);
    }

    all(params) {
        return this.$http.get(`api/v1/users`, {params});
    }

    updateUserStatus(id, params) {
        // return this.Restangular.one('users', id).customPUT(params, 'updatestatus');
    }

    deleteUser(id) {
        // return this.Restangular.one('users', id).remove();
    }

    getUserInfo() {
        // return this.Restangular.one('my').one('account').withHttpConfig({cache: this.cache}).get().then((response) => {
        //     response.data.hide_mail = !!response.data.hide_mail;
        //     response.data.no_self_notified = !!response.data.no_self_notified;
        //     response.data.warn_on_leaving_unsaved = !!response.data.warn_on_leaving_unsaved;
        //
        //     return response;
        // });
    }

    update(user) {
        // return this.Restangular.all('users').customPUT(user, user.id);
    }

}