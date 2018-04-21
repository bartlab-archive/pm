import ControllerBase from 'base/controller.base';

export default class GroupsEditController extends ControllerBase {

    static get $inject() {
      return ['usersService', '$stateParams','$state', 'groupsService','$mdToast', '$mdDialog', '$rootScope'];
    }

    $onInit() {
        this.load()
    }

    load() {
        this.group = this.groupsService.one(this.$stateParams.id).then((response) => {
            this.model = response.data;
        });
    }

    updateGroup() {

        this.groupsService.update(this.model).then(
           (response) => {
                if (response && response.status === 200) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent('Data updated successfully')
                    );
                    this.$state.go('groups.index');
                }
           }
       );
    }

}