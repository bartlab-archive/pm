import angular from 'angular';
import * as _ from 'lodash';

import ControllerBase from 'base/controller.base';



export default class ProjectsWikiIndexByController extends ControllerBase {


    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile'];
    }

    $onInit() {
        this.index_by = 'Index by';
        this.index_mode = false;
        this.WikiService.getAllWikiPage(this.$stateParams.project_id).then((response) => {
            if (!_.isEmpty(response.data))
            {

                this.pageList = response.data;
                if (this.$state.current.name.indexOf('title') != -1){
                    this.index_by += ' title';
                    this.index_mode = true;
                    this.formatByTitle(this.pageList,'indexBy');
                }
                if (this.$state.current.name.indexOf('date') != -1)
                {
                    this.index_mode = false;
                    this.index_by += ' date';
                    this.formatByDate(this.pageList,'indexBy');
                }
            }
        });
    }

    formatByDate(pages, tag) {
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

        let currentDiv = document.getElementById(tag);
        currentDiv.appendChild(body);

    }

    formatByTitle(pages, tag){
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
        let indexByTitle = document.getElementById(tag);
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

    openActionMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    indexBy(order){
        this.$state.go('projects.inner.wiki.index-by-' + order);
    }

    startPage() {
        this.$state.go('projects.inner.wiki.index');
    }

    newWikiPage() {
        this.$state.go('projects.inner.wiki.new');
    }





}