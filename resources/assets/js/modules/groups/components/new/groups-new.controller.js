import ControllerBase from 'base/controller.base';

export default class GroupsNewController extends ControllerBase {

    static get $inject() {
      return ['usersService', '$stateParams','$state', 'groupsService','$mdToast', '$mdDialog', '$rootScope'];
    }

    $onInit() {
        this.load()
    }

    load() {


    }

    saveGroup() {
        let data = _.cloneDeep(this.model);

        this.groupsService.create(data)
            .then((response) => {
                 if (response && response.status === 200) {
                     this.$mdToast.show(
                         this.$mdToast.simple().textContent('Data updated successfully')
                     );
                     this.$state.go('groups.index');
                 }
            })
            .catch((response) => this.onError(response));
    }

}