import InjectableBase from 'base/injectable.base';

/**
 * @property {Restangular} Restangular
 * @property {$state} $state
 * @property {$mdToast} $mdToast
 * @property {$stateParams} $stateParams
 */
export default class IssuesRun extends InjectableBase {

    static get $inject() {
        return ['Restangular', '$state', '$mdToast', '$stateParams', 'IssuesService'];
    }

    $onInit() {
        this.Restangular.setErrorInterceptor((...args) => this.errorInterceptor(...args));
    }

    errorInterceptor(response, deferred, responseHandler) {
        if (!!response.config.url.match(this.IssuesService.one().getRequestedUrl())) {

            // if the response status is 422, then the module is disabled for this project
            if (response.status === 422 && this.$stateParams.hasOwnProperty('project_id')) {
                this.$state.go('projects.inner.info', {project_id: this.$stateParams.project_id});
                this.$mdToast.show(
                    this.$mdToast.simple().textContent('Issue module disabled for this project')
                );
            }
        }
    }
}

