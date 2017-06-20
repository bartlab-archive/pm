import ControllerBase from 'base/controller.base';
import * as _ from 'lodash';

export default class ProjectsWikiPageController extends ControllerBase {

  static get $inject() {
    return ['$state', 'WikiService', 'MaterialToastService', '$mdToast', '$stateParams'];
  }

  $onInit() {
    this.WikiService.getPageWiki(this.$stateParams.id, this.$stateParams.name).then((response) => {
      if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
        this.data = response.data;
      }
    });

    this.editMode = false;
    this.mdToast = this.MaterialToastService;
  }

  submit() {
    this.data.save().then( (response) => {
      if (response && response.status === 200) {
        this.editMode = false;
        this.mdToast.success();
      }
    });
  }

  goToEdit() {
    this.editMode = true;
  }

  cancel() {
    this.editMode = false;
  }

}