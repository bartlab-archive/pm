import ControllerBase from 'base/controller.base';

export default class NewsListController extends ControllerBase {

    static get $inject() {
        return ['NewsService', '$state', '$stateParams'];
    }

    $onInit() {

        this.NewsService.getNews(this.$stateParams.id, {})
            .then((response) => {
                this.news = response.data

            })
            .catch(console.log);
    }

    goToNews(id) {
        this.$state.go('news.edit', {id: id});
    }

}