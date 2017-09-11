import angular from 'angular';
import * as _ from 'lodash';

import projectsWikiNewComponent from '../wiki-new/projects-wiki-new.component';

import ControllerBase from 'base/controller.base';

export default class ProjectsWikiController extends ControllerBase {


    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile'];
    }

    $onInit() {
        if (this.$stateParams.name) {

            this.WikiService.getPageWiki(this.$stateParams.project_id,this.$stateParams.name).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.data = response.data;
                }
            });
            this.currentPage =  this.$stateParams.name;

        }
        else
        {
            this.WikiService.getStartPageWiki(this.$stateParams.project_id).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.data = response.data;
                    console.log(response.data);

                }
            });
        }

        this.WikiService.getAllWikiPage(this.$stateParams.project_id).then((response) => {
            if (!_.isEmpty(response.data))
            {
                this.pageList = response.data;
            }
        });

    }

    selectWiki(name){
        // this.goto(name);
        this.WikiService.getPageWiki(this.$stateParams.project_id, name).then((response) => {
            if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
                this.data = response.data;
            }
        });
    }

    indexBy(order){
        this.$state.go('projects.inner.wiki.index-by-' + order);
    }
    startPage()
    {
        this.$state.go('projects.inner.wiki.index');
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
            parent: angular.element(document.body),
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

    deleteWikiPage(){

        this.WikiService.deleteWikiPage(this.$stateParams.project_id, this.$stateParams.name).then((response) => {
                console.log(response.data);
                this.deleteResult = response.data;
                if (this.deleteResult.success){
                    this.$state.go('projects.inner.wiki.index',{project_id: this.$stateParams.project_id })
                }

        });

    }

    goToEdit(name) {
        // if (this.data) {
        //     this.editMode = true;

        //     // this.$state.go('projects-inner.wiki.edit', {name : this.data.title});
        // }

        this.$state.go('projects.inner.wiki.edit', {name: name});

    }

    openActionMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    };

    submit() {
        this.data.save().then((response) => {
            if (response && response.status === 200) {
                this.editMode = false;
                this.mdToast.success();
            }
        });
    }

    cancel() {
        this.editMode = false;
    }



    goto(name) {

        this.$state.go('projects.inner.wiki.page', {name: name});
    }

}