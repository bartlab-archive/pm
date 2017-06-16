import ControllerBase from 'base/controller.base';

export default class ProjectsWikiEditController extends ControllerBase {

  static get $inject() {
    return ['$state', 'WikiService', '$stateParams'];
  }

  $onInit() {
    this.WikiService.getStartPageWiki(this.$stateParams.id).then((response) => {
      if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
        this.data = response.data;
        console.log(this.data);
        this.markdown = this.data.text;
      }
    });
  }


}