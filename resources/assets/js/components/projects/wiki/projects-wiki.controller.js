import angular from 'angular';
import * as _ from 'lodash';

import projectsWikiNewComponent from '../wiki-new/projects-wiki-new.component';

import ControllerBase from 'base/controller.base';

export default class ProjectsWikiController extends ControllerBase {

  static get $inject() {
    return ['$state', '$mdDialog', 'WikiService'];
  }

  $onInit() {
   this.WikiService.getStartPageWiki().then((response) => {
      if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
        this.markdown = response.data;
      }
    });
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

}