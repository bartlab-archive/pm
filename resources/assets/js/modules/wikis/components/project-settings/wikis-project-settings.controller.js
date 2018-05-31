import ControllerBase from 'base/controller.base';
import WikisService from "../../services/wikis.service";

/**
 */
export default class WikisProjectSettingsController extends ControllerBase {

    static get $inject() {
        return ['$mdToast', 'wikisService', 'projectsService'];
    }

    $onInit() {
        this.wikisService
            .getWiki(this.projectsService.getCurrentId())
            .then((response) => {
                if(response.status == 204) {
                    return;
                }
                this.wiki = response.data.data;
            })
    }

    submit() {
        (this.wiki.id ?
            this.wikisService.updateWiki(this.projectsService.getCurrentId(), {start_page: this.wiki.start_page}) :
            this.wikisService.createWiki(this.projectsService.getCurrentId(), {start_page: this.wiki.start_page})
        )
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