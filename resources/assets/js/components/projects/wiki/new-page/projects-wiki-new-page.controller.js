import ControllerBase from 'base/controller.base';
import _ from 'lodash';

export default class ProjectsWikiNewPageController extends ControllerBase {

  static get $inject() {
    return ['$state', 'WikiService', 'MaterialToastService', '$mdToast'];
  }

  $onInit() {
    this.WikiService.getPageWiki(this.$stateParams.id).then((response) => {
      if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
        this.data = response.data;
      }
    });

    this.editMode = false;
    this.mdToast = this.MaterialToastService;
  }

}