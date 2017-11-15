import * as _ from 'lodash';
import ControllerBase from 'base/controller.base';
import wikiPreviewComponent from '../preview/wiki-preview.component';

export default class WikiEditController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile'];
    }

    $onInit() {
        this.newWiki = false;
        this.pageWiki = {};
        this.errors = {};
        this.page = {
            title: '',
            parent_id: null,
            content: {
                text: ''
            }
        };

        if (this.$stateParams.name) {
            this.WikiService.getPageWiki(this.$stateParams.project_id, this.$stateParams.name).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.page = response.data;
                }
            });
        } else {
            this.newWiki = true;
        }

        this.test = 123;
    }

    save(redirect) {
        if (this.newWiki) {
            let queryParams = {
                title: this.page.title,
                text: this.page.content.text,
                parent_id: this.page.parent_id
            };

            this.WikiService.addNewWikiPage(this.$stateParams.project_id, queryParams)
                .then((response) => {
                    if (response && response.status === 201) {
                        this.$mdDialog.cancel();
                        this.$state.go('wiki.page', {name: response.data.title});
                    }
                })
                .catch((response) => this.onError(response));
        }
        else {
            this.page.text = 'save page';
            this.page.save().then((response) => {
                if (response && response.status === 200) {
                    this.editMode = false;

                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('Success saved!')
                    );

                    if (this.$stateParams.name !== this.page.title) {
                        this.$state.go('wiki.edit', {name: response.data.title})
                    }

                    if (redirect) {
                        this.$state.go('wiki.page', {name: response.data.title});
                    }
                }
            });
        }
    }

    showPreview($event) {
        this.$mdDialog.show(
            {
                controller: wikiPreviewComponent.controller,
                controllerAs: '$ctrl',
                bindToController: true,
                locals: {
                    page: this.page
                },
                template: wikiPreviewComponent.template,
                clickOutsideToClose: true,
            }
        );
    }

    goTo(name) {
        if (name) {
            this.$state.go('wiki.page.view', {name: name});
        } else {
            this.$state.go('wiki.index');
        }

    }

    onError(response) {
        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data.errors', {});
            for (let field in this.errors) {
                if (this.pageWiki.hasOwnProperty(field)) {
                    this.pageWiki[field].$setValidity('server', false);
                }
            }
        }
    }

    change(field) {
        if (this.pageWiki.hasOwnProperty(field) && this.errors.hasOwnProperty(field)) {
            this.pageWiki[field].$setValidity('server', true);
            this.errors[field] = undefined;
        }
    }

}