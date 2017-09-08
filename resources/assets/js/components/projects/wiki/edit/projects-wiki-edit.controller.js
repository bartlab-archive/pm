import angular from 'angular';
import * as _ from 'lodash';

import ControllerBase from 'base/controller.base';

export default class ProjectsWikiEditController extends ControllerBase {


    static get $inject() {
        return ['$state', '$mdDialog', 'WikiService', '$stateParams', '$mdToast', '$compile'];
    }

    $onInit() {
            this.WikiService.getPageWiki(this.$stateParams.project_id,this.$stateParams.name).then((response) => {
                if (!_.isEmpty(response.data)) {
                    this.page = response.data;
                    console.log(this.page)
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


    goTo(name) {

        this.$state.go('projects.inner.wiki.page', { name: name });
    }

}