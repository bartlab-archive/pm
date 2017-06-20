import ControllerBase from 'base/controller.base';

export default class ProjectsNewsController extends ControllerBase {
    static get $inject() {
        return ['ProjectsService', '$stateParams'];
    }

    $onInit() {
        console.log(this.$stateParams);
        this.ProjectsService.getNews(this.$stateParams.id, {})
            .then((response) => {
            this.news = response.data

        })
            .catch(console.log);

    }

}