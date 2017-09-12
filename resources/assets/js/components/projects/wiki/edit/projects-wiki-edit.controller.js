import angular from 'angular';
import * as _ from 'lodash';

import ControllerBase from 'base/controller.base';

import showPreviewComponent from 'components/modal/projects/wiki/show-preview/show-preview.component';


export default class ProjectsWikiEditController extends ControllerBase {


    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile'];
    }

    $onInit() {
            this.newWiki = false;
            this.page =
                {
                    title: '',
                    parent_id: null,
                    content: {
                        text: ''
                    }

                };
            this.pageWiki = {};
            if (this.$stateParams.name)
            {
                this.WikiService.getPageWiki(this.$stateParams.project_id,this.$stateParams.name).then((response) => {
                    if (!_.isEmpty(response.data)) {
                        this.page = response.data;
                    }
                });
            } else
            {
                this.newWiki = true;


            }

        this.WikiService.getAllWikiPage(this.$stateParams.project_id).then((response) => {
            if (!_.isEmpty(response.data))
            {
                this.pages = response.data;
            }
        });
    }

    save(redirect) {
        if (this.newWiki)
        {
            let queryParams = {
                title: this.page.title,
                text: this.page.content.text
            };
            this.WikiService.addNewWikiPage(this.$stateParams.project_id, queryParams)
                .then((response) => {
                    if (response && response.status === 201)
                    {
                        this.$mdDialog.cancel();
                        this.$state.go('projects.inner.wiki.page', {name: response.data.title});
                    }
                })
                .catch((response) => this.onError(response));
        }
        else
        {
            this.page.text = 'save page';
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
    }

    showPreview($event)
    {
        this.$mdDialog.show(
            this.setMdDialogConfig(showPreviewComponent, $event.target, this.page)
        );
    }
    goTo(name) {
        if (name)
        {
            this.$state.go('projects.inner.wiki.page', { name: name });
        } else
        {
            this.$state.go('projects.inner.wiki.index');
        }

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

    onError(response) {
        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data.errors', {});
            console.log(this.errors);
            for (let field in this.errors) {
                console.log(field);
                if (this.pageWiki.hasOwnProperty(field)) {
                    this.pageWiki[field].$setValidity('server', false);
                }
            }
        }
    }


}