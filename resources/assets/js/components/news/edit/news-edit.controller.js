import ControllerBase from 'base/controller.base';

/**
 * @property {NewsService} NewsService
 * @property {$stateParams} $stateParams
 * @property {$state} $state
 */
export default class NewsEditController extends ControllerBase {

    static get $inject() {
        return ['NewsService', '$stateParams', '$state'];
    }

    $onInit() {
        this.NewsService.one(this.$stateParams.id).then((response) => {
            this.news = response.data;
        });
    }

    sendresponse() {
        this.news.save().then((response) => {
            if (_.get(response, 'status') === 200 && !_.isEmpty(response.data)) {
                this.$state.go('news.list');
            }
        })
    }
}