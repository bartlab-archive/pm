import ControllerBase from 'base/controller.base';

export default class ProjectsWikiNewController extends ControllerBase {
  static get $inject() {
    return ['$mdDialog', 'WikiService', '$stateParams', '$state'];
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

    this.WikiService.addNewWikiPage(this.$stateParams.id, queryParams).then((response) => {
      if (response && response.status === 201) {
        this.$mdDialog.cancel();
        this.$state.go('projects-inner.wiki.page', {name : response.data.title});
      }
    });
  }
}