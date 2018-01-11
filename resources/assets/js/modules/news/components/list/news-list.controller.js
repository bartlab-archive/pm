import ControllerBase from 'base/controller.base';
import _ from 'lodash';

/**
 * @property {NewsService} NewsService
 * @property {$state} $state
 * @property {$stateParams} $stateParams
 * @property {ProjectsService} ProjectsService
 */
export default class NewsListController extends ControllerBase {

    static get $inject() {
        return ['NewsService', '$state', '$stateParams', 'ProjectsService'];
    }

    $onInit() {
        let enabledModules = {};
        const currentProjectId = this.currentProjectId();

        this.ProjectsService.one(currentProjectId).then((response) => {
            enabledModules = this.ProjectsService.getModules(_.get(response, 'data.enabled_modules', []));

            if (typeof enabledModules.news === 'undefined') {
                window.location.href = '/projects/' + currentProjectId;
            } else {

                this.NewsService.getNews(this.$stateParams.id, {})
                    .then((response) => {
                        this.news = response.data
                    })
                    .catch(console.log);
            }
        });


    }

    goToNews(id) {
        this.$state.go('news.edit', {id: id});
    }

    currentProjectId() {
        debugger;
        return _.get(this.$state, 'data.layoutDefault.projectId') || _.get(this.$stateParams, 'project_id');
    }

}