import ControllerBase from 'base/controller.base';

/*
todo: breadcrumbs for wiki page
 */

/**
 * WikiPageController
 *
 * @property {$state} $state
 * @property {$mdDialog} $mdDialog
 * @property {$stateParams} $stateParams
 * @property {$mdToast} $mdToast
 * @property {projectsService} projectsService
 * @property {wikisService} wikisService
 * @property {$q} $q
 * @property {$rootScope} $rootScope
 */
export default class WikisPageController extends ControllerBase {

    static get $inject() {
        return ['$state', '$mdDialog', 'wikisService', '$stateParams', '$mdToast', 'projectsService', '$q', '$rootScope'];
    }

    $onInit() {
        this.load();
    }

    load() {
        this.loadProcess = true;
        const projectId = this.projectsService.getCurrentId();
        let deferred = this.$q.defer();


        deferred.promise.then((name) => {
            return this.wikisService
                .onePage(projectId, name)
                .then((response) => {
                    this.loadProcess = false;

                    if (!response.data.data.id) {
                        this.$state.go('wiki.page.edit', {name: name});
                    } else {
                        this.page = response.data.data;
                    }
                });
        });

        if (!this.$stateParams.name) {
            this.wikisService
                .oneWiki(projectId)
                .then((response) => {
                    const startPage = response.data.data.start_page;

                    // start page not set!
                    if (!startPage) {
                        this.$rootScope.$emit('notFound', response);
                        deferred.reject(response);
                    }

                    deferred.resolve(startPage);
                });
        } else {
            deferred.resolve(this.$stateParams.name);
        }

        return deferred.promise;
    }

    watch() {
        if (!this.page) {
            return false;
        }

        this.wikisService
            .watch(this.projectsService.getCurrentId(), this.page.id)
            .then(() => {
                this.page.is_watcheble = true
            });
    }

    unwatch() {
        if (!this.page) {
            return false;
        }

        this.wikisService
            .unwatch(this.projectsService.getCurrentId(), this.page.id)
            .then(() => {
                this.page.is_watcheble = false
            });
    }

    lock() {
        if (!this.page) {
            return false;
        }

        this.wikisService
            .lock(this.projectsService.getCurrentId(), this.page.id)
            .then(() => {
                this.page.protected = true
            });
    }

    unlock() {
        if (!this.page) {
            return false;
        }

        this.wikisService
            .unlock(this.projectsService.getCurrentId(), this.page.id)
            .then(() => {
                this.page.protected = false
            });
    }

    remove() {
        let confirm = this.$mdDialog.confirm()
            .title(`Would you like to delete this page?`)
            .ok('Delete!')
            .cancel('Cancel');

        this.$mdDialog.show(confirm).then(() => {
            this.wikisService.removePage(this.projectsService.getCurrentId(), this.page.id).then(() => {
                this.$state.go('wiki.index');

                this.$rootScope.$emit('deldeteWikiPage');
            });

            this.selectedGroup = [];
        });
    }
}