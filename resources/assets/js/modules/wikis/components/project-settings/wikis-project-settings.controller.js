import ControllerBase from 'base/controller.base';

// todo: add action for delete button
/**
 */
export default class WikisProjectSettingsController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', 'wikisService', 'projectsService'];
    }

    $onInit() {
        this.wikisService
            .oneWiki(this.projectsService.getCurrentId())
            .then((response) => {
                this.wiki = response.data.data;
            })
    }

    submit() {
        const projectId = this.projectsService.getCurrentId();
        const model = {
            start_page: this.wiki.start_page
        };

        (this.wiki.id ? this.wikisService.updateWiki(projectId, model) : this.wikisService.createWiki(projectId, model))
            .then((response) => {
                Object.assign(this.wiki, response.data.data);

                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Success saved!').position('bottom left')
                );
            })
            .catch((response) => {
                if (response.status === 422) {
                    this.$mdToast.show(
                        this.$mdToast.simple().textContent(response.data.message).position('bottom left')
                    );
                }

                this.errors = response.data.errors;
            })
    }
}