import ServiceBase from 'base/service.base';

/**
 * @property {Restangular} Restangular
 * @property {$cacheFactory} $cacheFactory
 */
export default class GroupsService extends ServiceBase {

    static get $inject() {
        return [];
    }

    $onInit($injector){

    }

    one(identifier){
        // return this.Restangular.all('groups').one(identifier).get();
    }

    all(){
        // return this.Restangular.all('groups');
    }

    update(group) {
        // return this.Restangular.all('groups').customPUT(group, group.id);
    }

    create(params) {
        // return this.Restangular.all('groups').post(params);
    }

    deleteGroup(id){
        // return this.Restangular.one('groups', id).remove();
    }
}
