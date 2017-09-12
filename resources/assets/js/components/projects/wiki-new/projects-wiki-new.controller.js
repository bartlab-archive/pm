import ControllerBase from 'base/controller.base';
import _ from 'lodash';

export default class ProjectsWikiNewController extends ControllerBase {
    static get $inject() {
        return ['$mdDialog', 'WikiService', '$stateParams', '$state'];
    }

    $onInit() {
        this.errors = {};
        // console.log(this);

    }

    cancel() {
        this.$mdDialog.cancel();
    }

    onSubmit() {

        let queryParams = {
            title: this.title.replace( / /g, "_" ),
            text: '# ' + this.title
        };

        // console.log(this);
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

    onError(response) {
        if (_.get(response, 'status') === 500) {
            this.$mdToast.show(
                this.$mdToast.simple().textContent('Server error')
            );
        } else {
            this.errors = _.get(response, 'data.errors', {});
            for (let field in this.errors) {
                if (this.newWiki.hasOwnProperty(field)) {
                    this.newWiki[field].$setValidity('server', false);
                }
            }
        }
    }
}