import ControllerBase from 'base/controller.base';
import * as _ from 'lodash';

import projectsWikiNewComponent from '../../wiki-new/projects-wiki-new.component';

export default class ProjectsWikiPageController extends ControllerBase {

  static get $inject() {
    return ['$state', 'WikiService', '$mdToast', '$stateParams', '$mdDialog'];
  }

  $onInit() {
    this.WikiService.getPageWiki(this.$stateParams.id, this.$stateParams.name).then((response) => {
      if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
        this.data = response.data;
      }
    });

    this.WikiService.getAllWikiPage(this.$stateParams.id).then((response) => {
      if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
        this.pageList = response.data;
      }
    });


    this.editMode = false;
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

  setMdDialogConfig(component, target) {


    let ctrlConfig = [].concat(
      component.controller.$inject || [],
      [(...args) => {
        let ctrl = new component.controller(...args);
        ctrl.$onInit && ctrl.$onInit();
        return ctrl;
      }]
    );

    return {
      controller: ctrlConfig,
      controllerAs: '$ctrl',
      template: component.template,
      panelClass: 'modal-custom-dialog',
      parent:angular.element(document.body),
      trapFocus: true,
      clickOutsideToClose: true,
      clickEscapeToClose: true,
      escapeToClose: true,
      hasBackdrop: true,
      disableParentScroll: true,
      openFrom: target,
      closeTo: target
    }
  }

  newWikiPage($event) {
    this.$mdDialog.show(
      this.setMdDialogConfig(projectsWikiNewComponent, $event.target)
    );
  }

  goto(name) {
    this.$state.go('projects-inner.wiki.page', {name : name});
  }

}