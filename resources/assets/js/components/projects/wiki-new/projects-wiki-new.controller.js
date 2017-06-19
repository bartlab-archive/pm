import ControllerBase from 'base/controller.base';

export default class ProjectsWikiNewController extends ControllerBase {
  static get $inject() {
    return ['$mdDialog', 'WikiService', '$stateParams'];
  }

  cancel() {
    this.$mdDialog.cancel();
  }

  onSubmit() {
    console.log(this.$stateParams.id);
    let queryParams = {
      title: this.title,
      text: 'h1. ' + this.title
    };

    this.WikiService.addNewWikiPage(this.$stateParams.id, queryParams).then( (response) => {
      console.log(response);
    });
  }
}