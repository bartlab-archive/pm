import angular from 'angular';
import * as _ from 'lodash';

import projectsWikiNewComponent from '../wiki-new/projects-wiki-new.component';

import ControllerBase from 'base/controller.base';

export default class ProjectsWikiController extends ControllerBase {

  static get $inject() {
    return ['$state', '$mdDialog', 'WikiService', '$stateParams'];
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

  goToEdit() {
    if(this.data) {
      this.$state.go('projects-inner.wiki.edit', {name : this.data.title});
    }

  }

}