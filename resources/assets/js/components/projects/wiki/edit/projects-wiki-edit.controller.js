import angular from 'angular';
import * as _ from 'lodash';

import ControllerBase from 'base/controller.base';

import showPreviewComponent from 'components/modal/projects/wiki/show-preview/show-preview.component';


export default class ProjectsWikiEditController extends ControllerBase {


    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile'];
    }

    $onInit() {
        this.preview = false;
            this.WikiService.getPageWiki(this.$stateParams.project_id,this.$stateParams.name).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.page = response.data;
                }
            });

        this.WikiService.getAllWikiPage(this.$stateParams.project_id).then((response) => {
            if (!_.isEmpty(response.data))
            {
                this.pages = response.data;
            }
        });
    }

    submit(redirect) {
        this.page.text = 'text any';
        this.page.save().then((response) => {
            if (response && response.status === 200) {
                this.editMode = false;
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Success saved!')
                );
                if (this.$stateParams.name != this.page.title)
                {
                    this.$state.go('projects.inner.wiki.edit', { name: response.data.title })
                }
                if (redirect)
                {
                    this.$state.go('projects.inner.wiki.page', { name: response.data.title });
                }
            }
        });
    }

    showPreview($event)
    {
        this.$mdDialog.show(
            this.setMdDialogConfig(showPreviewComponent, $event.target, this.page)
        );
    }
    goTo(name) {

        this.$state.go('projects.inner.wiki.page', { name: name });
    }

    setMdDialogConfig(component, target, data = {}) {
        let ctrlConfig = [].concat(
            component.controller.$inject || [],
            [(...args) => {
                let ctrl = new component.controller(...args);

                // decorator
                _.each(data, (v, k) => {
                    ctrl[k] = v;
                });

                ctrl.$onInit && ctrl.$onInit();
                return ctrl;
            }]
        );

        return {
            controller: ctrlConfig,
            controllerAs: '$ctrl',
            template: component.template,
            //panelClass: 'modal-custom-dialog',
            parent: angular.element(document.body),
            trapFocus: true,
            clickOutsideToClose: true,
            clickEscapeToClose: true,
            escapeToClose: true,
            hasBackdrop: true,
            disableParentScroll: true,
            openFrom: target,
            closeTo: target,
        }
    }


}