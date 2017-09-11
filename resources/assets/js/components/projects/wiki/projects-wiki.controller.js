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
                this.formatByDate(this.pageList);
                this.formatByTitle(this.pageList);
            }
        });

    }

    formatByDate(pages)
    {
        pages.sort((a, b) => {
           return (new Date(a.created_on).getTime() > new Date(b.created_on).getTime()) ? true : false;
        });
        let startDate = pages[0].created_on.split(' ', 1);
        var body = document.createElement('DIV');
        pages.forEach((page) =>{
            let currentData = page.created_on.split(' ', 1);
            if (startDate == currentData )
            {
                let wikiPage = currentData;
                wikiPage.innerHTML = page.title;
                body.appendChild(wikiPage);
            }
            else
            {
                let date = document.createElement('H2');
                date.innerHTML = currentData;
                body.appendChild(date);
                let wikiPage = document.createElement('a');
                wikiPage.innerHTML = page.title;
                wikiPage.setAttribute('href',this.$state.href('projects.inner.wiki.page',{ project_id: this.$stateParams.project_id, name: page.title}));
                body.appendChild(wikiPage);
            }
        });

        let currentDiv = document.getElementById('byDate');
        currentDiv.appendChild(body);

    }

    formatByTitle(pages){
        pages.sort((a, b) => {
            return (a.title > b.title) ? true : false;
        });

        let root = document.createElement('UL');
        pages.forEach((page) =>
        {
            if (!page.parent_id)
            {
                let li = document.createElement('LI');
                let a = document.createElement('A');
                a.setAttribute('href',this.$state.href('projects.inner.wiki.page',{ project_id: this.$stateParams.project_id, name: page.title}));
                a.innerHTML = page.title;
                li.appendChild(a);
                root.appendChild(li);
                this.getChildren(li, page.id, pages);

            }

        });
        let indexByTitle = document.getElementById('indexByTitle');
        indexByTitle.appendChild(root);
    }

    getChildren(parentElement,parentId, pages){
        let root = document.createElement('UL');
        pages.forEach((page, index) =>
        {
            if (page.parent_id == parentId){

                let li = document.createElement('LI');
                let a = document.createElement('A');
                a.setAttribute('href',this.$state.href('projects.inner.wiki.page',{ project_id: this.$stateParams.project_id, name: page.title}));
                a.innerHTML = page.title;
                li.appendChild(a);
                this.getChildren(li, page.id, pages);
                root.appendChild(li)
            }

        });
        parentElement.appendChild(root);
    }

    selectWiki(name){
        // this.goto(name);
        this.WikiService.getPageWiki(this.$stateParams.project_id, name).then((response) => {
            if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
                this.data = response.data;
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